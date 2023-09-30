import {Composer, Markup} from "telegraf";
import path from "path";
import fs from "fs";
import savePDF from "../../functions/savePDF.js";
import saveAnswers from "../../functions/saveAnswers.js";
import mongodbConnection from "../../functions/mongodbConnection.js";
import sendEmail from "../../functions/sendEmail.js";
import getPageScreenshot from "../../functions/getPageScreenshot.js";
import {deleteMessages} from "../../functions/deleteMessages.js";
import {editAnswersKeyboard, editAnswersKeyboard2, startKeyboard} from "../../functions/keyboards.js";
import editAnswers from "../../functions/editAnswers.js";
import {currentDirectory} from "../../../config/config.js";
import {editMessageText} from "../../functions/editMessageText.js";
import {tryDeleteMessageIdFromArray} from "../../functions/tryDeleteMessageIdFromArray.js";

export const saveData = new Composer();
export async function saveDataCallback(ctx){
    if (ctx.message.text === "/exit" || ctx.message.text === "/menu") {
        ctx.session.msg = await ctx.reply('Чем я могу Вам помочь?', startKeyboard);
        ctx.session.messageIds.push(ctx.session.msg.message_id)
        await ctx.scene.leave()
    } else {
        await tryDeleteMessageIdFromArray(ctx)
    }
}

export async function saveDataEditCallback(ctx){
    ctx.answerCbQuery()
    ctx.editMessageReplyMarkup(editAnswersKeyboard);
}

export async function saveDataBackCallback(ctx){
    ctx.answerCbQuery()
    await editMessageText(ctx, editAnswersKeyboard2)
}

export async function saveDataListCallback(ctx){
    ctx.answerCbQuery()
    try {
        ctx.editMessageReplyMarkup({});
    } catch (err) {
        console.log(err);
    }
    const option = ctx.match[1];
    await editAnswers(ctx, option)
}

export async function saveDataReadyCallback(ctx){
    ctx.answerCbQuery()
    try {
        ctx.editMessageReplyMarkup({});
    } catch (err) {
        console.log(err);
    }
    const currentDate = new Date();
    ctx.wizard.state.data.formattedDate = currentDate.toLocaleString();
    await mongodbConnection(ctx.wizard.state.data)
    await saveAnswers(ctx.wizard.state.data)
    await savePDF(ctx.wizard.state.data)
    const screenshot = await getPageScreenshot(ctx.wizard.state.data)
    const bufferScreenshot = await Buffer.from(screenshot, 'base64');
    ctx.session.msg = await ctx.replyWithPhoto({ source: bufferScreenshot });
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    await sendEmail(ctx.wizard.state.data)
    const pdfFileName = ctx.wizard.state.data.pdfFileName;
    const filePath = path.join(currentDirectory, 'src/data/output/filled_PDF', pdfFileName);
    fs.unlink(filePath, (error) => {
        if (error) {
            console.error('Error while deleting PDF');
            return;
        }
        console.log(`The PDF: ${pdfFileName} has been deleted`);
    });

    ctx.session.msg = await ctx.replyWithHTML(`Форма успешно отправлена организатору! ✅\nЗа несколько дней до мероприятия мы свяжемся с Вами для подтверждения Вашего участия.\n\nВы можете заполнить ещё одну форму, но стоит помнить, что участие в мероприятии ограничено <u>не более чем двумя сотрудниками</u> от одного предприятия/отдела/факультета.`, Markup.inlineKeyboard([
        [Markup.button.callback('Заполнить еще одну форму  📝', '/newAnketa')],
        [Markup.button.callback('Нет, спасибо', '/exitAnketa')],
    ]));
    ctx.session.messageIds.push(ctx.session.msg.message_id)
}

export async function saveDataExitCallback(ctx){
    ctx.answerCbQuery()
    await deleteMessages(ctx)
    ctx.session.msg = await ctx.reply('Чем я могу Вам помочь?', startKeyboard);
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    return ctx.scene.leave()
}

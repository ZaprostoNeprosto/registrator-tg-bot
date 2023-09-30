import {Composer} from "telegraf";
import {deleteMessages} from "../../functions/deleteMessages.js";
import {editAnswersKeyboard, startKeyboard} from "../../functions/keyboards.js";
import {editMessageText} from "../../functions/editMessageText.js";
import {tryDeleteMessageAfterEditing} from "../../functions/tryDeleteMessageAfterEditing.js";

export const company = new Composer();
const nameRegExp = /^[А-Яа-яЁё]+$/;

export async function companyCallback(ctx){
    if (ctx.message.text === "/exit" || ctx.message.text === "/menu") {
        await deleteMessages(ctx)
        ctx.session.msg = await ctx.reply('Чем я могу Вам помочь?', startKeyboard);
        ctx.session.messageIds.push(ctx.session.msg.message_id)
        await ctx.scene.leave()
    } else if (ctx.message && ctx.message.text && nameRegExp.test(ctx.message.text)) {
        // Обработка, если сообщение состоит только из букв
        ctx.wizard.state.data.lastName = ctx.message.text
        if (ctx.session.msgesIdFromEditingAnswers.length > 0) {
            // console.log(ctx.session.msgesIdFromEditingAnswers)
            await tryDeleteMessageAfterEditing(ctx)
            await editMessageText(ctx, editAnswersKeyboard)
            return ctx.wizard.selectStep(11)
        } else {
            ctx.session.msg = await ctx.reply('Какую организацию/предприятие Вы представляете?');
            ctx.session.messageIds.push(ctx.session.msg.message_id)
            return ctx.wizard.next()
        }
    } else {
        // Обработка, если сообщение содержит цифры и символы
        ctx.session.msg = await ctx.reply('Видимо где-то опечатка. Укажите фамилию:');
        ctx.session.messageIds.push(ctx.session.msg.message_id)
        if (ctx.session.msgesIdFromEditingAnswers.length > 0) {
            ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
        }
        return ctx.wizard.selectStep(ctx.wizard.cursor)
    }
}

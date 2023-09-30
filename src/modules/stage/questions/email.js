import {Composer} from "telegraf";
import {editAnswersKeyboard, startKeyboard} from "../../functions/keyboards.js";
import {deleteMessages} from "../../functions/deleteMessages.js";
import {editMessageText} from "../../functions/editMessageText.js";
import {tryDeleteMessageAfterEditing} from "../../functions/tryDeleteMessageAfterEditing.js";

export const email = new Composer();

export async function emailCallback(ctx){
    const phoneNumber = ctx.message?.text;
    const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');

    if (ctx.message.text === "/exit" || ctx.message.text === "/menu") {
        await deleteMessages(ctx)
        ctx.session.msg = await ctx.reply('Чем я могу Вам помочь?', startKeyboard);
        ctx.session.messageIds.push(ctx.session.msg.message_id)
        await ctx.scene.leave()
    } else if (/^\+?\d+$/.test(cleanPhoneNumber)) {
        const phoneWithoutPlus = cleanPhoneNumber.startsWith('+') ? cleanPhoneNumber.slice(1) : cleanPhoneNumber;
        if (phoneWithoutPlus.length !== 11) {
            ctx.session.msg = await ctx.reply('Неверный формат номера телефона. Укажите действительный номер телефона в формате 79991234567:');
            ctx.session.messageIds.push(ctx.session.msg.message_id)
            return ctx.wizard.selectStep(ctx.wizard.cursor)
        } else {
            const formattedPhoneNumber = `+7 (${phoneWithoutPlus.substring(1, 4)}) ${phoneWithoutPlus.substring(4, 7)}-${phoneWithoutPlus.substring(7, 9)}-${phoneWithoutPlus.substring(9)}`;
            ctx.wizard.state.data.phone = formattedPhoneNumber
            if (ctx.session.msgesIdFromEditingAnswers.length > 0) {
                // console.log(ctx.session.msgesIdFromEditingAnswers)
                await tryDeleteMessageAfterEditing(ctx)
                await editMessageText(ctx, editAnswersKeyboard)
                return ctx.wizard.selectStep(11)
            } else {
                ctx.session.msg = await ctx.reply('Укажите Ваш контактный (рабочий) адрес электронной почты:');
                ctx.session.messageIds.push(ctx.session.msg.message_id)
                return ctx.wizard.next()
            }
        }
    } else {
        ctx.session.msg = await ctx.reply('Неверный формат номера телефона. Укажите действительный номер телефона в формате 79991234567:');
        ctx.session.messageIds.push(ctx.session.msg.message_id)
        if (ctx.session.msgesIdFromEditingAnswers.length > 0) {
            ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
        }
        return ctx.wizard.selectStep(ctx.wizard.cursor)
    }
}

import {Composer} from "telegraf";
import {deleteMessages} from "../../functions/deleteMessages.js";
import {editAnswersKeyboard, startKeyboard} from "../../functions/keyboards.js";
import {editMessageText} from "../../functions/editMessageText.js";
import {tryDeleteMessageAfterEditing} from "../../functions/tryDeleteMessageAfterEditing.js";

export const phone = new Composer();

export async function phoneCallback(ctx){
    if (ctx.message.text === "/exit" || ctx.message.text === "/menu") {
        await deleteMessages(ctx)
        ctx.session.msg = await ctx.reply('Чем я могу Вам помочь?', startKeyboard);
        ctx.session.messageIds.push(ctx.session.msg.message_id)
        await ctx.scene.leave()
    } else {
        ctx.wizard.state.data.position = ctx.message.text
        if (ctx.session.msgesIdFromEditingAnswers.length > 0) {
            // console.log(ctx.session.msgesIdFromEditingAnswers)
            await tryDeleteMessageAfterEditing(ctx)
            await editMessageText(ctx, editAnswersKeyboard)
            return ctx.wizard.selectStep(11)
        } else {
            ctx.session.msg = await ctx.reply('Укажите Ваш контактный номер телефона по которому мы свяжемся с Вами для подтверждения регистрации. Номер должен быть в формате 79991234567:');
            ctx.session.messageIds.push(ctx.session.msg.message_id)
            if (ctx.session.msgesIdFromEditingAnswers.length > 0) {
                ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
            }
            return ctx.wizard.next()
        }
    }
}

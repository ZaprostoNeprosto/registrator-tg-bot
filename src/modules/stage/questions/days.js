import {Composer, Markup} from "telegraf";
import {editAnswersKeyboard, optionsToKeyboard2, startKeyboard} from "../../functions/keyboards.js";
import {deleteMessages} from "../../functions/deleteMessages.js";
import {editMessageText} from "../../functions/editMessageText.js";
import {tryDeleteMessageAfterEditing} from "../../functions/tryDeleteMessageAfterEditing.js";
import {tryDeleteMessageIdFromArray} from "../../functions/tryDeleteMessageIdFromArray.js";

export const days = new Composer();
export async function daysCallback(ctx){
    if (ctx.message.text === "/exit" || ctx.message.text === "/menu") {
        await deleteMessages(ctx)
        ctx.session.msg = await ctx.reply('Чем я могу Вам помочь?', startKeyboard);
        ctx.session.messageIds.push(ctx.session.msg.message_id)
        await ctx.scene.leave()
    } else {
        await tryDeleteMessageIdFromArray(ctx)
    }
}

export async function daysListCallback(ctx){
    const option = ctx.match[1];
    const index = ctx.wizard.state.data.selectedOptions.indexOf(option);
    if (index === -1) {
        ctx.wizard.state.data.selectedOptions.push(option);
    } else {
        ctx.wizard.state.data.selectedOptions.splice(index, 1);
    }
    const keyboard = {
        inline_keyboard: [
            ...optionsToKeyboard2(ctx.wizard.state.data)],
    };
    ctx.editMessageReplyMarkup(keyboard);
    ctx.answerCbQuery()
}

export async function daysFinalCallback(ctx){
    ctx.answerCbQuery()
    const selectedOptionsDays = ctx.wizard.state.data.selectedOptions.join(', ');
    ctx.wizard.state.data.daysText = selectedOptionsDays
    ctx.wizard.state.data.days = ctx.wizard.state.data.selectedOptions
    ctx.wizard.state.data.selectedOptions = [];
    ctx.wizard.state.data.defaultOptions = [];
    ctx.wizard.state.data.defaultOptions2 = [];
    if (ctx.session.msgesIdFromEditingAnswers.length > 0) {
        // console.log(ctx.session.msgesIdFromEditingAnswers)
        await tryDeleteMessageAfterEditing(ctx)
        await editMessageText(ctx, editAnswersKeyboard)
        return ctx.wizard.selectStep(11)
    } else {
        await tryDeleteMessageAfterEditing(ctx)
        ctx.session.msg = await ctx.reply('Вы желаете принять участие в мастер-классе со своими образцами?', Markup.inlineKeyboard([
            [Markup.button.callback('Да', 'Да'),
                Markup.button.callback('Нет', 'Нет')]
        ]));
        ctx.session.messageIds.push(ctx.session.msg.message_id)
        ctx.session.prevMsg = ctx.session.msg
        return ctx.wizard.next()
    }
}

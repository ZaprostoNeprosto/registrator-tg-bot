import {Composer} from "telegraf";
import {deleteMessages} from "../../functions/deleteMessages.js";
import {
    defaultOptionsToKeyboard,
    defaultOptionsToKeyboard2,
    editAnswersKeyboard,
    optionsToKeyboard,
    startKeyboard
} from "../../functions/keyboards.js";
import editMessage from "../../functions/editMessage.js";
import {editMessageText} from "../../functions/editMessageText.js";
import {tryDeleteMessageAfterEditing} from "../../functions/tryDeleteMessageAfterEditing.js";
import {tryDeleteMessageIdFromArray} from "../../functions/tryDeleteMessageIdFromArray.js";

export const interest = new Composer();
const emailRegex = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

export async function interestCallback(ctx){
    if (ctx.message.text === "/exit" || ctx.message.text === "/menu") {
        await deleteMessages(ctx)
        ctx.session.msg = await ctx.reply('Чем я могу Вам помочь?', startKeyboard);
        ctx.session.messageIds.push(ctx.session.msg.message_id)
        await ctx.scene.leave()
    } else if (ctx.wizard.state.data.email && ctx.session.msgesIdFromEditingAnswers.length === 0) {
        await tryDeleteMessageIdFromArray(ctx)
    } else if (emailRegex.test(ctx.message?.text)) {
        ctx.wizard.state.data.email = ctx.message.text.trim().toLowerCase()
        if (ctx.session.msgesIdFromEditingAnswers.length > 0) {
            // console.log(ctx.session.msgesIdFromEditingAnswers)
            await tryDeleteMessageAfterEditing(ctx)
            await editMessageText(ctx, editAnswersKeyboard)
            return ctx.wizard.selectStep(11)
        } else {
            ctx.wizard.state.data.selectedOptions = [];
            const defaultOptions1 = ['Пробоподготовка для микроструктурных исследований 🧪', 'Оптическая микроскопия 🔬', 'Электронная микроскопия ⚛️', 'Анализаторы химического и фазового состава 🌈', 'Компьютерная томография и неразрушающий контроль 🖥️', 'Испытательное оборудование для контроля физико-механических свойств 🏗️', 'Твердомеры 💪', 'Термоанализ и реология 🌡️']
            const list  = defaultOptions1.map((option, index) => `\n${index + 1}. ${option}`).join('\n');
            const question = `Какое оборудование Вас интересует?\n(Вы можете выбрать один или несколько вариантов)`;
            const msg = `${question}\n${list}`;
            ctx.session.messageForEdit = msg

            let defaultOptions2 = [];
            for (let i = 1; i <= defaultOptions1.length; i++) {
                defaultOptions2.push(`${i}`);
            }

            ctx.wizard.state.data.defaultOptions = defaultOptions1
            ctx.wizard.state.data.defaultOptions2 = defaultOptions2
            const keyboard = {
                inline_keyboard: [
                    ...defaultOptionsToKeyboard(defaultOptions2)
                ],
            };
            ctx.session.msg = await ctx.replyWithHTML(msg, { reply_markup: keyboard });
            ctx.session.messageIds.push(ctx.session.msg.message_id)
            ctx.session.prevMsg = ctx.session.msg
            ctx.session.messageIdForEdit = ctx.session.msg.message_id
        }
    } else {
        ctx.session.msg = await ctx.reply('Видимо где-то опечатка. Укажите корректный Email:');
        ctx.session.messageIds.push(ctx.session.msg.message_id)
        if (ctx.session.msgesIdFromEditingAnswers.length > 0) {
            ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
        }
        return ctx.wizard.selectStep(ctx.wizard.cursor)
    }
}

export async function interestListCallback(ctx){
    const option = ctx.match[1];
    const index = ctx.wizard.state.data.selectedOptions.indexOf(option);

    if (index === -1) {
        ctx.wizard.state.data.selectedOptions.push(option);
    } else {
        ctx.wizard.state.data.selectedOptions.splice(index, 1);
    }

    const keyboard = {
        inline_keyboard: [
            ...optionsToKeyboard(ctx.wizard.state.data),
        ],
    };

    await editMessage(ctx)
    ctx.editMessageText(
        ctx.session.editedMessage,
        {
            parse_mode: 'HTML',
            message_id: ctx.session.messageIdForEdit, // идентификатор текущего сообщения
            chat_id: ctx.chat.id, // идентификатор текущего чата
            reply_markup: keyboard,
        }
    );
    ctx.answerCbQuery()
}

export async function interestFinalCallback(ctx){
    ctx.answerCbQuery()
    ctx.wizard.state.data.interest = ctx.wizard.state.data.selectedOptions
    ctx.wizard.state.data.selectedOptions = [];
    ctx.wizard.state.data.defaultOptions = [];
    ctx.wizard.state.data.defaultOptions2 = [];
    await tryDeleteMessageAfterEditing(ctx)
    const defaultOptions = ['23 мая', '24 мая', '25 мая']
    ctx.wizard.state.data.defaultOptions = defaultOptions
    const keyboard = {
        inline_keyboard: [
            ...defaultOptionsToKeyboard2(defaultOptions)]
    };
    ctx.session.msg = await ctx.reply(`Выберите желаемые дни посещения: \n(Вы можете выбрать один или несколько дней)`, { reply_markup: keyboard });
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.prevMsg = ctx.session.msg
    return ctx.wizard.next()
}

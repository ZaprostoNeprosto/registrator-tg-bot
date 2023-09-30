import {Composer, Markup} from "telegraf";
import {checkAnswersKeyboard, editAnswersKeyboard, startKeyboard} from "../../functions/keyboards.js";
import {deleteMessages} from "../../functions/deleteMessages.js";
import {editMessageText} from "../../functions/editMessageText.js";
import {tryDeleteMessageAfterEditing} from "../../functions/tryDeleteMessageAfterEditing.js";
import {tryDeleteMessageIdFromArray} from "../../functions/tryDeleteMessageIdFromArray.js";

export const check = new Composer();
export async function checkCallback(ctx){
    if (ctx.message.text === "/exit" || ctx.message.text === "/menu") {
        await deleteMessages(ctx)
        ctx.session.msg = await ctx.reply('Чем я могу Вам помочь?', startKeyboard);
        ctx.session.messageIds.push(ctx.session.msg.message_id)
        await ctx.scene.leave()
    } else {
        await tryDeleteMessageIdFromArray(ctx)
    }
}

export async function checkListCallback(ctx){
    ctx.answerCbQuery()
    await tryDeleteMessageAfterEditing(ctx)
    const option = ctx.match[1];
    ctx.wizard.state.data.practice = option;

    if (option === 'Да') {
        ctx.session.msg = await ctx.replyWithHTML(`Обращаем Ваше внимание на то, что в связи с большим количеством участников и ограничением по времени, работа с более чем <u>двумя образцами от одного участника</u> может проводиться на усмотрение сервисного инженера.\n\nДля того, чтобы все прошло максимально гладко и качественно, <b>возможно потребуется предварительная пробоподготовка</b>. Пожалуйста, свяжитесь с нами, чтобы согласовать детали. Мы будем рады помочь Вам и ответить на все Ваши вопросы!`, Markup.inlineKeyboard([
            [Markup.button.callback('Понимаю', 'ok')],
        ]));
        ctx.session.messageIds.push(ctx.session.msg.message_id)
        ctx.session.prevMsg = ctx.session.msg
        if (ctx.session.msgesIdFromEditingAnswers.length > 0) {
            ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
        }
    } else if (ctx.session.msgesIdFromEditingAnswers.length > 0) {
        await tryDeleteMessageAfterEditing(ctx)
        await editMessageText(ctx, editAnswersKeyboard)
        return ctx.wizard.selectStep(11)
    } else {
        await deleteMessages(ctx)
        ctx.session.msg = await ctx.replyWithHTML(`<b><u>Ваши ответы:</u></b>\n\n<b>ФИО:</b> ${ctx.wizard.state.data.lastName} ${ctx.wizard.state.data.firstName} ${ctx.wizard.state.data.middleName}\n<b>Предприятие:</b> ${ctx.wizard.state.data.company}\n<b>Должность:</b> ${ctx.wizard.state.data.position}\n<b>Адрес предприятия:</b> ${ctx.wizard.state.data.adress}\n<b>Даты посещения:</b> ${ctx.wizard.state.data.daysText} мая\n<b>Мастер-класс:</b> ${ctx.wizard.state.data.practice}\n<b>Телефон:</b> ${ctx.wizard.state.data.phone}\n<b>Email:</b> ${ctx.wizard.state.data.email}`, Markup.inlineKeyboard([
            [Markup.button.callback('Введенные данные подтверждаю  ✅', '/allIsOk')],
            [Markup.button.callback('Редактировать  ✏️', 'edit')],
            [Markup.button.callback('Удалить анкету  🗑', '/exitAnketa')],
        ]));
        ctx.session.messageIds.push(ctx.session.msg.message_id)
        ctx.session.prevMsg = ctx.session.msg
        ctx.session.resultMessageId = ctx.session.msg.message_id

        return ctx.wizard.next()
    }
}

export async function checkFinalCallback(ctx){
    ctx.answerCbQuery()
    if (ctx.session.msgesIdFromEditingAnswers.length > 0) {
        await tryDeleteMessageAfterEditing(ctx)
        await editMessageText(ctx, editAnswersKeyboard)
        return ctx.wizard.selectStep(11)
    } else if (ctx.session.prevMsg) {
        try  {
            await deleteMessages(ctx)
        } catch (err) {
            if (err.code === 400 && err.description === 'Bad Request: message to delete not found') {
                console.log('Сообщение уже удалено');
            } else {
                console.log(err);
            }
        }
    }
    ctx.session.msg = await ctx.replyWithHTML(`<b><u>Ваши ответы:</u></b>\n\n<b>ФИО:</b> ${ctx.wizard.state.data.lastName} ${ctx.wizard.state.data.firstName} ${ctx.wizard.state.data.middleName}\n<b>Предприятие:</b> ${ctx.wizard.state.data.company}\n<b>Должность:</b> ${ctx.wizard.state.data.position}\n<b>Адрес предприятия:</b> ${ctx.wizard.state.data.adress}\n<b>Даты посещения:</b> ${ctx.wizard.state.data.daysText} мая\n<b>Мастер-класс:</b> ${ctx.wizard.state.data.practice}\n<b>Телефон:</b> ${ctx.wizard.state.data.phone}\n<b>Email:</b> ${ctx.wizard.state.data.email}`, checkAnswersKeyboard);
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.prevMsg = ctx.session.msg
    ctx.session.resultMessageId = ctx.session.msg.message_id
    return ctx.wizard.next()
}

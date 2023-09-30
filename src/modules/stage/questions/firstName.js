import {Composer} from "telegraf";

export const firstName = new Composer();
export async function firstNameCallback(ctx) {
    ctx.wizard.state.data = {}
    ctx.session.msgesIdFromEditingAnswers = []
    ctx.session.msg = await ctx.replyWithHTML(`Спасибо за проявленный интерес! Чтобы зарегистрироваться, необходимо ответить на все вопросы в форме. После заполнения формы, она будет автоматически отправлена организатору.\nПри необходимости, вы сможете внести изменения в свои ответы перед отправкой.\n\n<i>Пожалуйста, обратите внимание, что заполняя регистрационную форму, вы даете свое согласие на обработку персональных данных.</i>`);
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.msg = await ctx.reply('Укажите Ваше имя:');
    ctx.session.messageIds.push(ctx.session.msg.message_id)

    return ctx.wizard.next()
}

import { deleteMessages } from "../functions/deleteMessages.js";
import readMyFilledForms from "../functions/readMyFilledForms.js";
import sendGallery from "../functions/sendGallery.js";
import { Markup } from "telegraf";

export async function myFormsCallback(ctx){
    ctx.answerCbQuery()
    await deleteMessages(ctx)
    ctx.session.images = []
    ctx.session.images = await readMyFilledForms(ctx)
    ctx.session.currentImageIndex = 0;
    ctx.session.totalImages = ctx.session.images.length
    if (ctx.session.images.length > 0) {
        ctx.session.msg = await sendGallery(ctx, ctx.session.currentImageIndex, ctx.session.totalImages, ctx.session.images[ctx.session.currentImageIndex]);
        ctx.session.messageIds.push(ctx.session.msg.message_id)
    } else {
        ctx.session.msg = await ctx.replyWithHTML(`
    <b>У Вас нет заполненных форм</b><a href="https://media.baamboozle.com/uploads/images/283734/1637652704_107384.png">&#8205;</a>
  `, Markup.inlineKeyboard([
            [Markup.button.callback('Заполнить регистрационную форму  📝', '/newAnketa')],
            [Markup.button.callback('Назад', 'exit')],
        ]));
        // https://free-png.ru/wp-content/uploads/2022/07/free-png.ru-366.png
        ctx.session.messageIds.push(ctx.session.msg.message_id)
    }
}

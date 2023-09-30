import { deleteMessages } from "../functions/deleteMessages.js";
import { startKeyboard } from "../functions/keyboards.js";

export async function exitCallback(ctx){
    ctx.answerCbQuery()
    await deleteMessages(ctx)
    ctx.session.currentImageIndex = 0;
    if (!ctx.session.messageIds) {
        ctx.session.messageIds = []
    }
    ctx.session.msg = await ctx.reply('Чем я могу Вам помочь?', startKeyboard);
    ctx.session.messageIds.push(ctx.session.msg.message_id)
}

import { startKeyboard } from "../functions/keyboards.js";

export async function startCallback(ctx) {
    ctx.session.msg = await ctx.reply('Чем я могу Вам помочь?', startKeyboard);
    if (!ctx.session.messageIds) {
        ctx.session.messageIds = []
    }
    ctx.session.messageIds.push(ctx.session.msg.message_id)
}

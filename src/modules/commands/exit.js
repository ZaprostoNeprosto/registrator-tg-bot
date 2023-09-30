import {deleteMessages} from "../functions/deleteMessages.js";
import {startKeyboard} from "../functions/keyboards.js";

export async function exitCallback(ctx) {
    await deleteMessages(ctx)
    ctx.session.msg = await ctx.reply('Чем я могу Вам помочь?', startKeyboard);
    ctx.session.messageIds.push(ctx.session.msg.message_id)
}

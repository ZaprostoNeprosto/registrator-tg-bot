import { deleteMessages } from "../functions/deleteMessages.js";
import sendGallery from "../functions/sendGallery.js";
import {schedule} from "../../config/config.js";

export async function infoCallback(ctx){
    ctx.answerCbQuery()
    await deleteMessages(ctx)
    ctx.session.images = []
    ctx.session.images = schedule;
    ctx.session.currentImageIndex = 0;
    ctx.session.totalImages = ctx.session.images.length
    ctx.session.msg = await sendGallery(ctx, ctx.session.currentImageIndex, ctx.session.totalImages, ctx.session.images[ctx.session.currentImageIndex]);
    ctx.session.messageIds.push(ctx.session.msg.message_id)
}

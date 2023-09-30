import editGallery from "../functions/editGallery.js";

export async function nextCallback(ctx){
    ctx.answerCbQuery()
    if (ctx.session.currentImageIndex < ctx.session.totalImages - 1) {
        ctx.session.currentImageIndex++;
        editGallery(ctx, ctx.session.currentImageIndex, ctx.session.totalImages, ctx.session.images[ctx.session.currentImageIndex]);
    }
}

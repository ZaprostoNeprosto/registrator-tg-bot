import editGallery from "../functions/editGallery.js";

export async function prevCallback(ctx){
    ctx.answerCbQuery()
    if (ctx.session.currentImageIndex > 0) {
        ctx.session.currentImageIndex--;
        editGallery(ctx, ctx.session.currentImageIndex, ctx.session.totalImages, ctx.session.images[ctx.session.currentImageIndex]);
    }
}

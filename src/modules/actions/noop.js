export async function noopCallback(ctx) {
    await ctx.answerCbQuery(`${ctx.session.images[ctx.session.currentImageIndex].caption}`)
}

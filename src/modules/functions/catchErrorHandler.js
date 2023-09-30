function errorHandler(err) {
    console.error('errorHandler:', err);
}
export async function catchErrorHandlerCallback(err, ctx) {
    errorHandler(err);
    ctx.reply('Произошла ошибка при обработке сообщения');
}

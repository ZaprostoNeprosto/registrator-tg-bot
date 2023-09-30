export const limitConfig = {
    window: 1000, // интервал времени в мс между запросами
    limit: 25, // максимальное количество запросов в указанный интервал времени
    keyGenerator: (ctx) => ctx.from.id, // генерация уникального ключа для пользователя
    onLimitExceeded: (ctx) => {
        ctx.session.msg = ctx.reply('Слишком много запросов! Попробуйте позже.');
        ctx.session.messageIds.push(ctx.session.msg.message_id)
    },
};

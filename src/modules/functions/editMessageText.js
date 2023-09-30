export async function editMessageText(ctx, keyboard) {
    ctx.telegram.editMessageText(
        ctx.chat.id,
        ctx.session.resultMessageId,
        null,
        `<b><u>Ваши ответы:</u></b>\n\n<b>ФИО:</b> ${ctx.wizard.state.data.lastName} ${ctx.wizard.state.data.firstName} ${ctx.wizard.state.data.middleName}\n<b>Предприятие:</b> ${ctx.wizard.state.data.company}\n<b>Должность:</b> ${ctx.wizard.state.data.position}\n<b>Адрес предприятия:</b> ${ctx.wizard.state.data.adress}\n<b>Даты посещения:</b> ${ctx.wizard.state.data.daysText} мая\n<b>Мастер-класс:</b> ${ctx.wizard.state.data.practice}\n<b>Телефон:</b> ${ctx.wizard.state.data.phone}\n<b>Email:</b> ${ctx.wizard.state.data.email}`,
        {parse_mode: 'HTML', reply_markup: keyboard}
    );
}

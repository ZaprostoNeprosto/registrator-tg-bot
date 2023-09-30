async function editMessage(ctx) {
  
  ctx.session.messageForEdit = `${ctx.session.messageForEdit}\n`;
  ctx.session.editedMessage = ctx.session.messageForEdit
  if (ctx.wizard.state.data.selectedOptions.length > 0) {
    for (let i = 0; i < ctx.wizard.state.data.selectedOptions.length; i++) {
      const regex = new RegExp(`\\n(${ctx.wizard.state.data.selectedOptions[i]}\\..+?)\\n`, 'g');
      ctx.session.editedMessage = ctx.session.editedMessage.replace(regex, `\n<b>$1</b>\n`);
    }
  } else {
    ctx.session.editedMessage = ctx.session.messageForEdit
  }
  return ctx.session.editedMessage
}

export default editMessage;
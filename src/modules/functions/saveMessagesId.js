
async function saveMessagesId(ctx, next) {
  if (!ctx.session)
    ctx.session = {}

  if (!ctx.session.messageIds) {
    ctx.session.messageIds = []
  }

  if (!ctx.session.userMessagesId) {
    ctx.session.userMessagesId = []
  }

  if (ctx.message && ctx.message?.text !== "/start") {
    const message = ctx.update.message;
    if (message && message.text) {
      ctx.session.messageIds.push(message.message_id);
      ctx.session.userMessagesId.push(message.message_id);
      console.log(`Message ID ${message.message_id} has been saved to the array`)
    }
  }
  return next();
}

export default saveMessagesId;


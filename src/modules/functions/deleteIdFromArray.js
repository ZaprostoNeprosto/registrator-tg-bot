
export async function deletePrevMessageIdFromArray(ctx) {
  // console.log(`The function for removing the last message id from the array has been called. Before deletion, array =`, ctx.session.messageIds)

  if (ctx.session.prevMsg.message_id) {
    let index = ctx.session.messageIds.indexOf(ctx.session.prevMsg.message_id);
  if (index > -1) {
    ctx.session.messageIds.splice(index, 1);
    // console.log(`Message ${ctx.session.prevMsg.message_id} has been removed from the array of registered messages.`)
    ctx.session.prevMsg = 0
    }
  }
}

export async function deleteMessageIdFromArray(ctx) {
  // console.log(`The function for removing the last message id from the array has been called. Before deletion, array =`, ctx.session.messageIds)

    let index = ctx.session.messageIds.indexOf(ctx.message.message_id);
    if (index > -1) {
      ctx.session.messageIds.splice(index, 1);
      // console.log(`Message ${ctx.message.message_id} has been removed from the array of registered messages.`)
    }
  // console.log(`After deletion, array =`, ctx.session.messageIds)
}

export async function delMsgIdFromArrayAfterEditing(ctx) {
  // console.log(`The function for removing the last message id from the array has been called. Before deletion, array =`, ctx.session.messageIds)

    let index = ctx.session.messageIds.indexOf(ctx.message.message_id);
    if (index > -1) {
      ctx.session.messageIds.splice(index, 1);
      // console.log(`Message ${ctx.message.message_id} has been removed from the array of registered messages.`)
    }
  // console.log(`After deletion, array =`, ctx.session.messageIds)
}

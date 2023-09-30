
export async function deleteMessages(ctx) {
  const chatId = ctx.chat.id
  // console.log(`The function for deleting all messages and clearing the array with IDs is called. Before deletion, array =`, ctx.session.messageIds)
  if (ctx.session?.messageIds) {
    for (const messageId of ctx.session.messageIds) {
        try {
          await ctx.telegram.deleteMessage(chatId, messageId)
        } catch(error) {
          // console.log(`Failed to delete message ${messageId}: Message not found.`)
        }
      }
    }
  ctx.session.messageIds = []
  // console.log(`SUCCESS - Deleting all messages and clearing the array with IDs.`)
}

export async function deleteMessagesAfterEditing (ctx) {
  const chatId = ctx.chat.id
  const filteredArray = ctx.session.userMessagesId.filter((value) => ctx.session.messageIds.includes(value));
  // console.log(`The function for deleting all messages and clearing the array with identifiers after editing has been called. Before deletion, array =`, filteredArray)
  if (ctx.session.msgesIdFromEditingAnswers) {
    const combinedArray = filteredArray.concat(ctx.session.msgesIdFromEditingAnswers);
    const index = combinedArray.indexOf(ctx.session.resultMessageId);

    if (index !== -1) {
      combinedArray.splice(index, 1);
    }

    for (const messageId of combinedArray) {
        try {
          await ctx.telegram.deleteMessage(chatId, messageId)
        } catch(error) {
          // console.log(`Failed to delete message ${messageId}: Message not found.`)
        }
      }
      ctx.session.userMessagesId = ctx.session.messageIds
      ctx.session.messageIds = ctx.session.messageIds.filter((value) => !combinedArray.includes(value));
      // ctx.session.messageIds.push(ctx.session.resultMessageId)
    }
    // console.log(`SUCCESS - Deleting all messages and clearing the array with IDs after editing.`)
}




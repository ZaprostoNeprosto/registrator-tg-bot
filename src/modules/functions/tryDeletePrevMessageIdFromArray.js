import {deletePrevMessageIdFromArray} from "./deleteIdFromArray.js";

export async function tryDeleteMessageAfterEditing(ctx) {
    if (ctx.session.prevMsg) {
        try {
            ctx.deleteMessage(ctx.session.prevMsg.message_id);
            await deletePrevMessageIdFromArray(ctx)
        } catch (err) {
            if (err.code === 400 && err.description === 'Bad Request: message to delete not found') {
                console.log('Сообщение уже удалено');
            } else {
                console.log(err);
            }
        }
    }
}

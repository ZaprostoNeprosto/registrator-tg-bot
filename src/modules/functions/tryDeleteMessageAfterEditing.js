import {deleteMessagesAfterEditing} from "./deleteMessages.js";

export async function tryDeleteMessageAfterEditing(ctx) {
    try  {
        await deleteMessagesAfterEditing(ctx)
    } catch (err) {
        if (err.code === 400 && err.description === 'Bad Request: message to delete not found') {
            console.log('Сообщение уже удалено');
        } else {
            console.log(err);
        }
    }
}

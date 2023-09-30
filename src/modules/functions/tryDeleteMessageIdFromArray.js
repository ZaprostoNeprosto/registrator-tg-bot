import {deleteMessageIdFromArray} from "./deleteIdFromArray.js";

export async function tryDeleteMessageIdFromArray(ctx){
    if (ctx.message?.message_id) {
        try  {
            ctx.deleteMessage(ctx.message.message_id);
            await deleteMessageIdFromArray(ctx)
        } catch (err) {
            if (err.code === 400 && err.description === 'Bad Request: message to delete not found') {
                console.log('Error while deleting message: it has already deleted');
            } else {
                console.log('Error while deleting message:', err);
            }
        }
        console.log('Message deleted')
    }
}

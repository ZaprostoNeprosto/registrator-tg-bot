import { deleteMessages } from "../functions/deleteMessages.js";

export async function newAnketaCallback(ctx) {
    ctx.answerCbQuery()
    await deleteMessages(ctx)
    ctx.scene.enter('sceneWizard');
}

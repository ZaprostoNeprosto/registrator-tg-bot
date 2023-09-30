import { deleteMessages } from "../functions/deleteMessages.js";
import { Markup } from "telegraf";
import {contact, eventPlace} from "../../config/config.js";

export async function contactsCallback(ctx){
    ctx.answerCbQuery()
    await deleteMessages(ctx)
    ctx.session.msg = await ctx.replyWithMarkdown(`${contact.firstName} ${contact.lastName} \(${contact.position}\) [${contact.formattedTel}](tel:${contact.tel})`);
    if (!ctx.session.messageIds) {
        ctx.session.messageIds = []
    }
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.msg = await ctx.replyWithVenue(eventPlace.latitude, eventPlace.longitude, eventPlace.locationTitle, eventPlace.address, Markup.inlineKeyboard([
        [Markup.button.callback('Назад', 'exit')],
    ]))
    ctx.session.messageIds.push(ctx.session.msg.message_id)
}

import {tryDeleteMessageIdFromArray} from "./tryDeleteMessageIdFromArray.js";

export async function handleUnknownMessageCallback(ctx){
    await tryDeleteMessageIdFromArray(ctx)
}

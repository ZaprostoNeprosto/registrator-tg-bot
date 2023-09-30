import {deleteMessages} from "./deleteMessages.js";

async function editGallery(ctx, currentImageIndex, totalImages, image) {

  if (!image) {
    ctx.answerCbQuery()
    await deleteMessages(ctx)
    ctx.reply('Ошибка: Информация отсутствует.')
    console.log(`No image found for index ${currentImageIndex}`);
    return;
  }

  const caption = `${currentImageIndex + 1} / ${totalImages}   —   ${image.caption}`;

  ctx.editMessageMedia({ type: 'photo', media: { source: image.path } }, { caption }).then(() => {
    ctx.editMessageReplyMarkup({
      inline_keyboard: [
        [
          { text: "⬅️", callback_data: "prev" },
          { text: caption, callback_data: "noop" },
          { text: "➡️", callback_data: "next" },
        ],
        [{ text: 'Назад', callback_data: 'exit' }],
      ],
    });
  });
}


export default editGallery;

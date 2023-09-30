import fs from 'fs';

async function sendGallery(ctx, currentImageIndex, totalImages, image) {

  if (!image) {
    ctx.reply('Ошибка: Информация отсутствует.')
    console.log(`No image found`);
    return;
  }

  const caption = `${currentImageIndex + 1} / ${totalImages}   —   ${image.caption}`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: "⬅️", callback_data: "prev" },
        { text: caption, callback_data: "noop" },
        { text: "➡️", callback_data: "next" },
      ],
      [{ text: 'Назад', callback_data: 'exit' }],
    ],
  };

  return ctx.replyWithPhoto({ source: fs.createReadStream(image.path) }, { reply_markup: keyboard });
}

export default sendGallery;

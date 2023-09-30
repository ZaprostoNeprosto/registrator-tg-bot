import { Markup } from 'telegraf';


export function defaultOptionsToKeyboard(options) {
  const keyboard = [];
  let currentRow = [];

  for (const option of options) {
    currentRow.push({ text: option, callback_data: option });

    if (currentRow.length === 8) {
      keyboard.push(currentRow);
      currentRow = [];
    }
  }

  if (currentRow.length > 0) {
    keyboard.push(currentRow);
  }

  return keyboard;
}

export function optionsToKeyboard(options) {
  const keyboard = [];
  let currentRow = [];
  let isAnythingChecked = 0

  for (const option of options.defaultOptions2) {

    if (options.selectedOptions.includes(option)) {
      currentRow.push({ text: `${option} \u2705`, callback_data: option });
      isAnythingChecked++ 
    } else {
      currentRow.push({ text: option, callback_data: option });
    }

    if (currentRow.length === 8) {
      keyboard.push(currentRow);
      currentRow = [];
    }
  }

  if (currentRow.length > 0) {
    keyboard.push(currentRow);
  }

  if (isAnythingChecked) {
    keyboard.push([{ text: 'Готово', callback_data: 'готово' }]);
  }

  return keyboard;
}

export function defaultOptionsToKeyboard2(options) {
  const keyboard = [];
  let currentRow = [];

  for (const option of options) {
    currentRow.push({ text: option, callback_data: option.slice(0, -4) });

    if (currentRow.length === 3) {
      keyboard.push(currentRow);
      currentRow = [];
    }
  }

  if (currentRow.length > 0) {
    keyboard.push(currentRow);
  }

  return keyboard;
}

export function optionsToKeyboard2(options) {
  const keyboard = [];
  let currentRow = [];
  let n = 0

  for (const option of options.defaultOptions) {

    if (options.selectedOptions.includes(option.slice(0, -4))) {
      currentRow.push({ text: `${option} \u2705`, callback_data: option.slice(0, -4) });
      n++
    } else {
      currentRow.push({ text: option, callback_data: option.slice(0, -4) });
    }

    if (currentRow.length === 3) {
      keyboard.push(currentRow);
      currentRow = [];
    }
  }

  if (currentRow.length > 0) {
    keyboard.push();
  }

  if (n>0) {
    keyboard.push([{ text: 'Готово', callback_data: 'готово' }]);
  }

  return keyboard;
}

export const startKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback('Заполнить регистрационную форму  📝', '/newAnketa')],
  [Markup.button.callback('Информация о мероприятии  📅', '/info')],
  [Markup.button.callback('Мои формы  📑', 'myForms')],
  [Markup.button.callback('Контакты 📍', '/contacts')]
])

export const checkAnswersKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback('Введенные данные подтверждаю  ✅', '/allIsOk')],
  [Markup.button.callback('Редактировать  ✏️', 'edit')],
  [Markup.button.callback('Удалить анкету  🗑', '/exitAnketa')],
])

export const editAnswersKeyboard = {
  inline_keyboard: [
    [{ text: 'Фамилия', callback_data: 'editLastName' }, { text: 'Имя', callback_data: 'editFistName' }],
    [{ text: 'Отчество', callback_data: 'editMiddleName' }, { text: 'Предприятие', callback_data: 'editCompany' }],
    [{ text: 'Должность', callback_data: 'editPosition' }, { text: 'Адрес предприятия', callback_data: 'editAdress' }],
    [{ text: 'Даты посещения', callback_data: 'editDays' }, { text: 'Мастер-класс', callback_data: 'editPractice' }],
    [{ text: 'Телефон', callback_data: 'editPhone' }, { text: 'Email', callback_data: 'editEmail' }],
    [{ text: 'Готово  ✅', callback_data: 'back' }],
],
};

export const editAnswersKeyboard2 = {
  inline_keyboard: [
    [{ text: 'Введенные данные подтверждаю  ✅', callback_data: '/allIsOk' }],
    [{ text: 'Редактировать  ✏️', callback_data: 'edit' }],
    [{ text: 'Удалить анкету  🗑', callback_data: '/exitAnketa' }],
],
};


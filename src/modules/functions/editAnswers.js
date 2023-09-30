import { defaultOptionsToKeyboard2 } from './keyboards.js'
import { Markup } from 'telegraf';

async function editAnswers(ctx, option) {
  ctx.session.msgesIdFromEditingAnswers = []

  if (option === 'editLastName') {
    ctx.session.msg = await ctx.reply('Укажите Вашу фамилию:');
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
    ctx.session.prevMsg = ctx.session.msg
    ctx.wizard.selectStep(3)
  }

  if (option === 'editFistName') {
    ctx.session.msg = await ctx.reply('Укажите Ваше имя:');
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
    ctx.session.prevMsg = ctx.session.msg
    ctx.wizard.selectStep(1)
  }

  if (option === 'editMiddleName') {
    ctx.session.msg = await ctx.reply('Укажите Ваше отчество:');
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
    ctx.session.prevMsg = ctx.session.msg
    ctx.wizard.selectStep(2)
  }

  if (option === 'editCompany') {
    ctx.session.msg = await ctx.reply('Какую организацию/предприятие Вы представляете?');
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
    ctx.session.prevMsg = ctx.session.msg
    ctx.wizard.selectStep(4)
  }

  if (option === 'editPosition') {
    ctx.session.msg = await ctx.reply('Укажите Вашу должность и степень (при наличии):');
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
    ctx.session.prevMsg = ctx.session.msg
    ctx.wizard.selectStep(6)
  }

  if (option === 'editAdress') {
    ctx.session.msg = await ctx.reply('Укажите адрес организации/предприятия, которую(ое) Вы представляете (город, улица, дом):');
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
    ctx.session.prevMsg = ctx.session.msg
    ctx.wizard.selectStep(5)
  }

  if (option === 'editDays') {
    ctx.wizard.state.data.selectedOptions = []
    const defaultOptions = ['23 мая', '24 мая', '25 мая']
    ctx.wizard.state.data.defaultOptions = defaultOptions
    const keyboard = {
      inline_keyboard: [
        ...defaultOptionsToKeyboard2(defaultOptions)]
    };
    ctx.session.msg = await ctx.reply(`Выберите желаемые дни посещения: \n(Вы можете выбрать один или несколько дней)`, { reply_markup: keyboard });
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
    ctx.session.prevMsg = ctx.session.msg
    ctx.wizard.selectStep(9)
  }

  if (option === 'editPractice') {
    ctx.session.msg = await ctx.reply('Вы желаете принять участие в мастер-классе со своими образцами?', Markup.inlineKeyboard([
      [Markup.button.callback('Да', 'Да'),
      Markup.button.callback('Нет', 'Нет')]
    ]));
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
    ctx.session.prevMsg = ctx.session.msg
    ctx.wizard.selectStep(10)
  }

  if (option === 'editPhone') {
    ctx.session.msg = await ctx.reply('Укажите Ваш контактный номер телефона по которому мы свяжемся с Вами для подтверждения регистрации. Номер должен быть в формате 79991234567:');
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
    ctx.session.prevMsg = ctx.session.msg
    ctx.wizard.selectStep(7)
  }

  if (option === 'editEmail') {
    ctx.session.msg = await ctx.reply('Укажите Ваш контактный (рабочий) адрес электронной почты:');
    ctx.session.messageIds.push(ctx.session.msg.message_id)
    ctx.session.msgesIdFromEditingAnswers.push(ctx.session.msg.message_id)
    ctx.session.prevMsg = ctx.session.msg
    ctx.wizard.selectStep(8)
  }

}

export default editAnswers;

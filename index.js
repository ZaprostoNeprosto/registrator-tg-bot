import { session, Telegraf } from 'telegraf';
import rateLimit from 'telegraf-ratelimit';
import stage from "./src/modules/stage/stage.js";
import { limitConfig } from "./src/modules/functions/limitConfig.js";
import saveMessagesId from './src/modules/functions/saveMessagesId.js'
import { startCallback } from "./src/modules/commands/start.js";
import { menuCallback } from "./src/modules/commands/menu.js";
import { newAnketaCallback } from "./src/modules/actions/newAnketa.js";
import { contactsCallback } from "./src/modules/actions/contacts.js";
import { infoCallback } from "./src/modules/actions/info.js";
import { myFormsCallback } from "./src/modules/actions/myForms.js";
import { exitCallback } from "./src/modules/commands/exit.js";
import { prevCallback } from "./src/modules/actions/prev.js";
import { nextCallback } from "./src/modules/actions/next.js";
import { noopCallback } from "./src/modules/actions/noop.js";
import { handleUnknownMessageCallback } from "./src/modules/functions/handleUnknownMessage.js";
import { catchErrorHandlerCallback } from "./src/modules/functions/catchErrorHandler.js";

// ------------------ Init -------------------------------------

    const token = process.env.BOT_TOKEN;
    const bot = new Telegraf(token);

// ------------------ Uses -------------------------------------

    bot.use(session());
    bot.use(rateLimit(limitConfig));
    bot.use(saveMessagesId);
    bot.use(stage.middleware());
    bot.launch();

// ------------------ Commands -------------------------------------

    bot.command('start', startCallback);
    bot.command('menu', menuCallback);
    bot.command('exit', exitCallback);

// ------------------ Actions -------------------------------------

    bot.action('/newAnketa', newAnketaCallback)
    bot.action('/contacts', contactsCallback);
    bot.action('/info', infoCallback);
    bot.action('myForms', myFormsCallback);
    bot.action('prev', prevCallback);
    bot.action('next', nextCallback);
    bot.action('noop', noopCallback);
    bot.action('exit', exitCallback)

// ------------------ Error handlers -------------------------------------

    bot.on('message', handleUnknownMessageCallback)
    bot.catch(catchErrorHandlerCallback);


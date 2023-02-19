require("dotenv").config();
const { Telegraf } = require("telegraf");
global. bot = new Telegraf(process.env.TG_TOKEN);

global.__basedir = __dirname;


require("./handler/command.js")(bot);
require("./handler/event.js")(bot);



bot.launch();


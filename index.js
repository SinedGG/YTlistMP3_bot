require("dotenv").config();
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.TG_TOKEN);

global.__basedir = __dirname;

bot.start((ctx) => {
  ctx.reply("Welcome!");
});


const getSong = require("./module/getSong.js");
const loadList = require("./module/loadList.js");
const getLinkFromOther = require("./module/getLinkFromOther.js");

bot.on("text", (ctx) => {
  const content = ctx.message.text;
  if (content.includes("youtube.com") || content.includes("youtu.be")) {
    if (content.includes("playlist?")) {
      const list_id = new URL(content).searchParams.get("list");
      loadList(bot,  ctx, list_id);
    } else getSong(bot, ctx, content);
  } else {
    getLinkFromOther(bot, ctx, content);
  }

  bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
});

bot.launch();

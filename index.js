require("dotenv").config();
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.TG_TOKEN);

const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

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
      loadList(bot, db, ctx, list_id);
    } else getSong(bot, db, ctx, content);
  } else {
    getLinkFromOther(bot, db, ctx, content);
  }

  bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
});

bot.launch();

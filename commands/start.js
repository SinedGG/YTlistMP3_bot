const db = require("../db");
const { Markup } = require("telegraf");

module.exports = {
  name: "start",
  execute(ctx) {
    db(`INSERT INTO users (tg_id, tg_username) VALUES (?, ?)`, [
        ctx.chat.id,
        ctx.chat.username,
      ]).catch((err) => console.log(err.message));
      ctx.reply(
        "Hi! Select a language to start:",
        Markup.inlineKeyboard([
          Markup.button.callback("🇺🇦", `ukr`),
          Markup.button.callback("🇺🇸/🇬🇧", `eng`),
        ])
      );
  },
};


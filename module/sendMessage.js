const db = require("../db.js");

module.exports = async (ctx, arg, dell) => {
  const chatId = ctx.chat.id;
  const [{ lang }] = await db(`SELECT lang FROM users WHERE tg_id = ?`, [
    chatId,
  ]);
  const lan = require(`../languages/${lang}.js`);

  const message = await bot.telegram.sendMessage(chatId, lan[arg]);

  if (dell)
    setTimeout(() => {
      bot.telegram.deleteMessage(chatId, message.message_id);
    }, 60 * 1000);
};

const db = require("../db.js");

module.exports = async (ctx, arg, dell) => {
  const chatId = ctx.chat.id;
  var [code] = await db(`SELECT lang FROM users WHERE tg_id = ?`, [chatId]);
  if (code) code = code.lang;
  else code = "eng";
  const lang = require(`../languages/${code}.js`);

  const message = await bot.telegram.sendMessage(chatId, lang[arg]);

  if (dell)
    setTimeout(() => {
      bot.telegram.deleteMessage(chatId, message.message_id);
    }, 60 * 1000);
};

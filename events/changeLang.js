const db = require("../db");
const sendMessage = require("../module/sendMessage");

module.exports = {
  name: "callback_query",
  async execute(ctx) {
    const data = ctx.callbackQuery.data;
    const lang = data.split(" ")[0];
    const param = data.split(" ")[1];
    if (data.startsWith("ukr") || data.startsWith("eng")) {
      await db(`UPDATE users SET lang = ? WHERE tg_id = ?`, [
        lang,
        ctx.chat.id,
      ]).catch((err) => console.log(err.message));

      ctx.answerCbQuery();

      if (param === "dell")
        bot.telegram.deleteMessage(
          ctx.chat.id,
          ctx.callbackQuery.message.message_id
        );

      sendMessage(ctx, "welcome");
    }
  },
};

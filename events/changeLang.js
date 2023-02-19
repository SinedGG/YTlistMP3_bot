const db = require("../db");
const sendMessage = require("../module/sendMessage");

module.exports = {
  name: "callback_query",
  async execute(ctx) {
    const data = ctx.callbackQuery.data;
    if (data.includes("ukr") || data.includes("eng")) {
      await db(`UPDATE users SET lang = ? WHERE tg_id = ?`, [
        data,
        ctx.chat.id,
      ]).catch((err) => console.log(err.message));

      ctx.answerCbQuery();
      sendMessage(ctx, "welcome");
    }
  },
};

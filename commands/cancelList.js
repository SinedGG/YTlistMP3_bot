const { tasks } = require("../module/loadList");

module.exports = {
  name: "cancel",
  execute(ctx) {
    tasks[toString(ctx.chat.id)] = false;

    setTimeout(() => {
      bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
    }, 15 * 1000);
  },
};

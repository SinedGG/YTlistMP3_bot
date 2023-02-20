const list = require("../module/loadList");
const sendMessage = require("../module/sendMessage");

module.exports = {
  name: "list",
  execute(ctx) {
    const url = ctx.message.text.split(" ")[1];
    const list_id = new URL(url).searchParams.get("list");
    var oneTime = false;
    if (url.includes("list=RD")) {
      sendMessage(ctx, "playlistRandom", true);
      oneTime = true;
    }

    list.load(ctx, list_id, oneTime);

    setTimeout(() => {
      bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
    }, 15 * 1000);
  },
};

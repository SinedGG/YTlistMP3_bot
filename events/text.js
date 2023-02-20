const getSong = require("../module/getSong.js");

const getLinkFromOther = require("../module/getLinkFromOther.js");
const list = require("../module/loadList.js");

module.exports = {
  name: "text",
  execute(ctx) {
    const content = ctx.message.text;
    if (content.includes("youtube.com") || content.includes("youtu.be")) {
      if (content.includes("playlist?")) {
        const list_id = new URL(content).searchParams.get("list");
        list.load(ctx, list_id);
      } else getSong(ctx, content);
    } else {
      getLinkFromOther(ctx, content);
    }

    setTimeout(() => {
      bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
    }, 60 * 1000);
  },
};

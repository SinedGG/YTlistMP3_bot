const getSong = require("../module/getSong.js");

const db = require("../db");
const getLinkFromOther = require("../module/getLinkFromOther.js");
const list = require("../module/loadList.js");

module.exports = {
  name: "text",
  execute(ctx) {
    db(`INSERT INTO users (tg_id, tg_username) VALUES (?, ?)`, [
      ctx.chat.id,
      ctx.chat.username,
    ]).catch((err) => console.log(err.message));

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

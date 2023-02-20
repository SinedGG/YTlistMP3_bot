var tasks = {};
const getListLink = require("./getListLink");
const getSong = require("./getSong");
const sendMessage = require("./sendMessage");

module.exports = {
  tasks,
  load: async (ctx, list_id, oneTime) => {
    try {
      sendMessage(ctx, "playlistStart", true);
      tasks[toString(ctx.chat.id)] = true;
      const links = await getListLink(list_id, oneTime);
      for (let i = 0; i < links.length; i++) {
        if (tasks[toString(ctx.chat.id)]) await getSong(ctx, links[i]);
      }
    } catch (err) {
      sendMessage(ctx, "playlistError", true);
      console.log(err);
    }
  },
};

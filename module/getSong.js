const getSongInfo = require("./getSongInfo");
const loadSong = require("./loadSong");
const db = require("../db");
const sendMessage = require("./sendMessage");

module.exports = (ctx, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const song = await getSongInfo(url);
      const rows = await db(`select message_id from link where yt_id = ?`, [
        song.id,
      ]);
      var message_id;
      if (rows.length === 0) {
        message_id = await loadSong(bot, song);
        console.log(
          `Downloading started for ${song.id} by ${ctx.chat.username} (${ctx.chat.id})`
        );
        sendMessage(ctx, "oneLoadding", true);
      } else {
        message_id = rows[0].message_id;
        console.log(
          `Redirected for ${song.id} by ${ctx.chat.username} (${ctx.chat.id})`
        );
      }

      bot.telegram.forwardMessage(
        ctx.chat.id,
        process.env.DATA_CHAT_ID,
        message_id
      );
      resolve();
    } catch (error) {
      console.log(error);
      sendMessage(ctx, "notFound", true);
      resolve();
    }
  });
};

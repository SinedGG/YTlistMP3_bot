const getSongInfo = require("./getSongInfo");
const loadSong = require("./loadSong");
const db = require("../db");
const sendMessage = require("./sendMessage");

module.exports = (ctx, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const song = await getSongInfo(url);
      console.log(`[${song.id}] Startign task from ${ctx.chat.username} user`);
      const rows = await db(`select message_id from link where yt_id = ?`, [
        song.id,
      ]);
      var message_id;
      if (rows.length === 0) {
        message_id = await loadSong(bot, song);
      } else {
        message_id = rows[0].message_id;
      }

      bot.telegram.forwardMessage(
        ctx.chat.id,
        process.env.DATA_CHAT_ID,
        message_id
      );
      resolve();
      console.log(`[${song.id}] Finished task from ${ctx.chat.username} user`);
    } catch (error) {
      console.log(error);
      sendMessage(ctx, "notFound", true);
      resolve();
    }
  });
};

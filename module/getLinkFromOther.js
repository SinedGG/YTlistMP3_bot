const axios = require("axios");
const getSong = require("./getSong.js");
module.exports = (bot, db, ctx, url) => {
  axios
    .get(`https://api.song.link/v1-alpha.1/links?url=${url}`)
    .then(({ data }) => {
      if (data.linksByPlatform.hasOwnProperty("youtubeMusic")) {
        const uniqueId = data.linksByPlatform.youtubeMusic.entityUniqueId;
        const song_id = data.entitiesByUniqueId[uniqueId].id;
        console.log(`[${song_id}] YT id found for url - ${url}`);
        getSong(bot, db, ctx, song_id);
      }
    })
    .catch(async (err) => {
      console.log(err);
      const err_msg = await bot.telegram.sendMessage(
        ctx.chat.id,
        `Unable to find song. Use Youtube song for better results`
      );
      setTimeout(() => {
        bot.telegram.deleteMessage(ctx.chat.id, err_msg.message_id);
      }, 15 * 1000);
    });
};

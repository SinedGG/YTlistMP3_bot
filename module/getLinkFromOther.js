const axios = require("axios");
const getSong = require("./getSong.js");
const sendMessage = require("./sendMessage.js");


module.exports = (ctx, url) => {
  axios
    .get(`https://api.song.link/v1-alpha.1/links?url=${url}`)
    .then(({ data }) => {
      if (data.linksByPlatform.hasOwnProperty("youtubeMusic")) {
        const uniqueId = data.linksByPlatform.youtubeMusic.entityUniqueId;
        const song_id = data.entitiesByUniqueId[uniqueId].id;
        console.log(`[${song_id}] YT id found for url - ${url}`);
        getSong(bot, ctx, song_id);
      }
    })
    .catch(async (err) => {
      console.log(err.message);
      sendMessage(ctx, "notFoundOther")
    });
};

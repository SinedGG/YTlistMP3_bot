require("dotenv").config();
const axios = require("axios");
const getSong = require("./getSong");

module.exports = async (bot, ctx, list_id) => {
  try {
    const api_key = process.env.YT_TOKEN;
    var out = [];
    var page_token = "";

    do {
      const request = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list_id}&pageToken=${page_token}&key=${api_key}&maxResults=1000`;
      const res = await axios.get(request);
      for (let j = 0; j < res.data.items.length; j++) {
        var id = res.data.items[j].snippet.resourceId.videoId;
        out.push(id);
      }
      page_token = res.data.nextPageToken;
    } while (page_token);

    for (let i = 0; i < out.length; i++) {
      await getSong(bot, ctx, out[i]);
    }
  } catch (err) {
    reject("[list] " + err.response.data.error.message);
  }
};

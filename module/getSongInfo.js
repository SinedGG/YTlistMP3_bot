const ytdl = require("ytdl-core");

module.exports = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await ytdl.getBasicInfo(url);
      resolve({
        title: res.videoDetails.title,
        author: res.videoDetails.author.name.replace(" - Topic", ""),
        id: res.videoDetails.videoId,
        art: res.videoDetails.thumbnails[res.videoDetails.thumbnails.length - 1]
          .url,
      });
    } catch (error) {
      reject(error.message);
    }
  });
};

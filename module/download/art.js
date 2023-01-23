const axios = require("axios");
const fs = require("fs");
const sharp = require("sharp");

module.exports = (song_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(
        `https://i.ytimg.com/vi_webp/${song_id}/maxresdefault.webp`,
        { responseType: "stream" }
      );
      const writer = fs.createWriteStream(`${__basedir}/temp/${song_id}.webp`);
      res.data.pipe(writer);
      writer.on("finish", () => {
        console.log(`[${song_id}] Art download complete`);
        sharp.cache(false);
        sharp(`${__basedir}/temp/${song_id}.webp`)
          .resize(1000, 1000)
          .toFile(`${__basedir}/temp/${song_id}.jpg`)
          .then(() => {
            console.log(`[${song_id}] Art cropped for`);
            resolve();
          });
      });
    } catch (error) {
      console.log(`[${song_id}] Art download error`);
      reject(error);
    }
  });
};

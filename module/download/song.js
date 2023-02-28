const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");

module.exports = (song_id, path) => {
  return new Promise((resolve, reject) => {
    const stream = ytdl(song_id, {
      filter: "audioonly",
      requestOptions: {
        headers: {
          cookie: process.env.COOKIE,
        },
      },
    }).on("error", (err) => {
      console.log(err);
      reject(err);
    });

    ffmpeg(stream)
      .audioBitrate(128)
      .save(path)
      .on("error", (err) => {
        reject(err);
        console.log(`[${song_id}] Audio download error`);
        console.log(err);
      })
      .on("end", () => {
        resolve();
      });
  });
};

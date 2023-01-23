const fs = require("fs");
require("dotenv").config();

const downloadSong = require("./downloadSong");

module.exports = (bot, db, song) => {
  return new Promise(async (resolve, reject) => {
    try {
      const patch = await downloadSong(song);
      const msg = await bot.telegram.sendAudio(
        process.env.DATA_CHAT_ID,
        { source: patch },
        {
          title: song.title,
          performer: song.author,
          thumb: { source: `${__basedir}/temp/${song.id}.jpg` },
        }
      );
      db.query(`insert into link (message_id, yt_id) values (?,?)`, [
        msg.message_id,
        song.id,
      ]);
      clear(song.id, patch);
      resolve(msg.message_id);
    } catch (error) {
      reject(error);
    }
  });
};

function clear(videoID, patch) {
  try {
    fs.unlinkSync(`./temp/${videoID}.jpg`);
    fs.unlinkSync(`./temp/${videoID}.webp`);
    fs.unlinkSync(patch);
  } catch (error) {
    console.log(error);
  }
}

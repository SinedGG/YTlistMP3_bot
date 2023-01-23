const ytdl = require("ytdl-core"),
  ffmpeg = require("fluent-ffmpeg"),
  fs = require("fs"),
  axios = require("axios"),
  sharp = require("sharp"),
  id3 = require("node-id3").Promise;

function file_name(name) {
  var out = name;
  return out.replace(/[/\\?%*:|"<>]/g, " ");
}

function main(song) {
  return new Promise(async (resolve, reject) => {
    const path = `./temp/${file_name(info.artist)} - ${file_name(
      info.title
    )}.mp3`;

    const stream = ytdl(song, {
      filter: "audioonly",
    })
      .on("error", (err) => {
        console.log(err);
      })
      .on("info", (info) => {
        console.log(err);
      });

    ffmpeg(stream)
      .audioBitrate(128)
      .save(path)
      .on("error", (err) => {
        console.log(err);
      })
      .on("end", () => {
        console.log(`[${info.id}] Audio download complete`);
        download_art();
      });

    function download_art() {
      https
        .get(info.thumbnail, (res) => {
          const file = fs.createWriteStream(`./temp/${info.id}.webp`);
          res.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log(`[${info.id}] Art download complete`);
            crop_art();
          });
        })
        .on("error", (err) => {
          console.log(err);
        });
    }

    function crop_art() {
      sharp.cache(false);
      sharp(`./temp/${info.id}.webp`)
        .resize(1000, 1000)
        .toFile(`./temp/${info.id}.jpg`)
        .then(() => {
          console.log(`[${info.id}] Art cropped for`);
          set_metadata();
        });
    }

    async function set_metadata() {
      try {
        const tags = {
          title: info.title,
          artist: info.artist,
          APIC: `./temp/${info.id}.jpg`,
        };
        await id3.write(tags, path);
      } catch (error) {
        console.log(err);
      }
      resolve(path);
    }
  });
}

module.exports = main;

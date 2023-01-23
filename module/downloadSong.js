const id3 = require("node-id3").Promise;

const art = require("./download/art");
const convert = require("./download/song");
const getSongInfo = require("./getSongInfo");

function file_name(name) {
  var out = name;
  return out.replace(/[/\\?%*:|"<>]/g, " ");
}

module.exports = (s) => {
  return new Promise(async (resolve, reject) => {
    try {
      const path = `${__basedir}/temp/${file_name(s.author)} - ${file_name(
        s.title
      )}.mp3`;

      await Promise.all([convert(s.id, path), art(s.id)]);
      const tags = {
        title: s.title,
        artist: s.author,
        APIC: `${__basedir}/temp/${s.id}.jpg`,
      };
      await id3.write(tags, path);
      resolve(path);
    } catch (error) {
      reject(error);
    }
  });
};

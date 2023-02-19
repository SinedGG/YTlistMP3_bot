const fs = require("fs");

module.exports = (bot) => {
  const eventsPath = "./commands";
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = eventsPath + "/" + file;
    const event = require("." + filePath);
    bot.command(event.name, (...args) => event.execute(...args));
  }
};
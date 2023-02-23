const admin = require("../module/ifAdmin");

module.exports = {
  name: "userinfo",
  async execute(ctx) {
    try {
      if (!admin(ctx.chat.id)) return;

      const id = ctx.message.text.split(" ")[1];
      const info = await bot.telegram.getChat(id);
      ctx.reply(
        `User Info:
        ID: ${info.id}
        Username: ${info.username}
        First Name: ${info.first_name}
        Last Name: ${info.last_name}
        Bio: ${info.bio}
        `
      );
    } catch (error) {
      ctx.reply("Error: " + error.message);
    }
  },
};

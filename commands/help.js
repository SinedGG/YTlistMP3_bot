const sendMessage = require("../module/sendMessage");

module.exports = {
  name: "help",
  execute(ctx) {
    sendMessage(ctx, "welcome");
  },
};


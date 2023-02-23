module.exports = (id) => {
  const allowedID = process.env.ADMIN_CHAT_ID.split(",");

  for (let i = 0; i < allowedID.length; i++) {
    if (allowedID[i] == id) {
      return true;
    }
  }
  return false;
};

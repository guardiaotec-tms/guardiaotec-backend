const { db } = require("../database/firebase");
const { getCurrentFormattedDate } = require("./getCurrentFormattedDate");

const uploadError = async (errorData) => {
  const today = getCurrentFormattedDate();
  db.collection(`errors/data/${today}`).add({
    ...errorData,
    thrownAt: new Date(),
  });
};

module.exports = { uploadError };

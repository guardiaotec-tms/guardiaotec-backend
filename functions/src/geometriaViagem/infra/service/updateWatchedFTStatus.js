const { db } = require("../../../shared/infra/database/firebase");

const updateWatchedFTStatus = async (ftn, status) => {
  await db.doc("watchedFTs/" + ftn).update({ status });
  console.log(`updated watchedFTStatus, ftn: ${ftn}`);
};

module.exports = { updateWatchedFTStatus };

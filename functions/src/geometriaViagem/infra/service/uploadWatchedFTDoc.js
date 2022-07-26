const { db } = require("../../../shared/infra/database/firebase");

const uploadWatchedFTDoc = async (ftn, watchedFTsDocData) => {
  await db.doc(`watchedFTs/${ftn}`).set(watchedFTsDocData);
  console.log("uploaded ftn: ", ftn);
};

module.exports = { uploadWatchedFTDoc };

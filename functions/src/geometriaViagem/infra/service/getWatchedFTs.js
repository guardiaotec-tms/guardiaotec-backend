const { db } = require("../../../shared/infra/database/firebase");

const getWatchedFTs = async () => {
  const watchedDocs = await db
    .collection("watchedFTs")
    .get()
    .then((qs) => qs.docs.map((doc) => doc.data()));
  return watchedDocs.filter((wd) => wd.status === "active");
  // return ["RER0G46"];
};

module.exports = {
  getWatchedFTs,
};

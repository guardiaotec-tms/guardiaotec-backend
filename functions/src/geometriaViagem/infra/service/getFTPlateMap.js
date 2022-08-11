const { db } = require("../../../shared/infra/database/firebase");

const getFTPlateMap = async () => {
  return await db
    .doc("ftPlateMap/map")
    .get()
    .then((doc) => doc.data());
  // return {
  //   RER0G46: "15713108",
  // };
};

module.exports = { getFTPlateMap };

const { db } = require("../../../shared/infra/database/firebase");

const uploadFTPlateMap = async (map) => {
  await db.doc("ftPlateMap/map").update(map);
};
module.exports = { uploadFTPlateMap };

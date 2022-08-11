const { db } = require("../../../shared/infra/database/firebase");

const isEmpty = (obj) => Object.keys(obj).length === 0;

const uploadFTPlateMap = async (map) => {
  if (isEmpty(map)) {
    console.log("ftPlateMap is empty!");
  } else {
    await db.doc("ftPlateMap/map").update(map);
    console.log("updated ftPlateMap");
  }
};

module.exports = { uploadFTPlateMap };

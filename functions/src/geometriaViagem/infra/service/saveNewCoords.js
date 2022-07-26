const { db } = require("../../../shared/infra/database/firebase");

const saveNewCoords = async (ftn, unitedCoords) => {
  await db
    .doc(`watchedFTs/${ftn}`)
    .update({ coords: JSON.stringify(unitedCoords) });
};

module.exports = { saveNewCoords };

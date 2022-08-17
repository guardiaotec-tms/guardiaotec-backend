const { db } = require("../../../shared/infra/database/firebase");

const saveNewCoords = async (ftn, unitedCoords) => {
  console.log(unitedCoords, "unitedCoords");
  await db
    .doc(`watchedFTs/${ftn}`)
    // .update({ coords: JSON.stringify(unitedCoords) });
    .update({ coords: unitedCoords });
};

module.exports = { saveNewCoords };

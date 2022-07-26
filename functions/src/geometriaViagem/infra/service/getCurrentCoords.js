const { db } = require("../../../shared/infra/database/firebase");

const getCurrentCoords = async (ftn) => {
  const currentCoords = await db
    .doc(`watchedFTs/${ftn}`)
    .get()
    .then((doc) => doc.data().coords);

  return JSON.parse(currentCoords);
};

module.exports = { getCurrentCoords };

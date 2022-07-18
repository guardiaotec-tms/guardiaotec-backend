const { db } = require("../../../shared/infra/database/firebase");

const saveGeoJson = async (ftn, transpId, geojson) => {
  await db
    .collection(`companies/${transpId}/geojsons`)
    .doc(ftn)
    .set({ geojson })
    .then(() => {
      console.log("Geometria da viagem calculada! Ficha técnica: ", ftn);
    });
};

module.exports = { saveGeoJson };

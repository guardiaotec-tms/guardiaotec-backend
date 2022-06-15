const { db } = require("../../../shared/infra/database/firebase");

const saveGeoJson = async (ftn, transpId, geojson) => {
  await db
    .collection(`companies/${transpId}/geojsons`)
    .doc(ftn)
    .set({ geojson })
    .then(() => {
      console.log("Saved geojson");
      console.log("ft: ", ftn);
      console.log("geojson", { geojson });
    });
};

module.exports = { saveGeoJson };

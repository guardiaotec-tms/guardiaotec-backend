const { db } = require("../../../shared/infra/database/firebase");
const { makeGeoJson } = require("./makeGeoJson");

// if geojson does not exist, create and save it
const getGeoJson = async (transpId, vinculo) => {
  let geojsonDoc = await db
    .doc(`companies/${transpId}/geojsons/${vinculo["Ficha Técnica"]}`)
    .get()
    .then((doc) => {
      if (doc.exists) return doc.data();
    });

  // if (geojsonDoc) console.log("encontrei");
  if (geojsonDoc) return geojsonDoc.geojson;
  return makeGeoJson(transpId, vinculo);
};

module.exports = { getGeoJson };

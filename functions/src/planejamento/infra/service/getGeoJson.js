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
  if (!geojsonDoc) return makeGeoJson(transpId, vinculo);
  if (geojsonDoc.geojsonv2) {
    console.log(`Usando geojsonv2, ficha: ${vinculo["Ficha Técnica"]}`);
    return geojsonDoc.geojsonv2;
  }
  console.log(
    `Sem v2. Usando antigo geojsonv1, ficha: ${vinculo["Ficha Técnica"]}`
  );
  return geojsonDoc.geojson;
};

module.exports = { getGeoJson };

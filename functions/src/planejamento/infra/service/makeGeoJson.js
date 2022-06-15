const { makeGeoJsonFromItineraries } = require("./makeGeoJsonFromItineraries");
const { saveGeoJson } = require("./saveGeoJson");

const makeGeoJson = async (transpId, vinculo) => {
  // const its = await getItineraries(vinculo["Plano de Viagem"], transpId);
  const its = vinculo.its;
  let geojson = await makeGeoJsonFromItineraries(its, transpId);
  geojson = JSON.stringify(geojson);
  await saveGeoJson(vinculo["Ficha Técnica"], transpId, geojson);
  return geojson;
};

module.exports = { makeGeoJson };

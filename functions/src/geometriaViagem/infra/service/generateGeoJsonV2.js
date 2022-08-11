const {
  makeGeoJsonFromCoordsArray,
} = require("../../../planejamento/infra/service/makeGeoJsonFromItineraries");

const generateGeoJsonV2 = async (company, ftn, coords) => {
  coords = coords.sort((c1, c2) => {
    const result = c1.recordedAt.toDate() - c2.recordedAt.toDate();
    if (result < 0 || result === 0) {
      console.log(result < 0);
    }
    return result;
  });
  const coordsArray = coords.map((c) => ({ lng: c.coord[0], lat: c.coord[1] }));
  let geojsonv2 = makeGeoJsonFromCoordsArray(coordsArray);
  geojsonv2 = JSON.stringify(geojsonv2);
  console.log(`generated geojsonV2 for ftn: ${ftn}`);
  return geojsonv2;
};

module.exports = { generateGeoJsonV2 };

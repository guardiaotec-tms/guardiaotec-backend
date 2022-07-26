const {
  makeGeoJsonFromCoordsArray,
} = require("../../../planejamento/infra/service/makeGeoJsonFromItineraries");

const generateGeoJsonV2 = async (company, ftn, coords) => {
  const coordsArray = coords.map((c) => ({ lng: c[0], lat: c[1] }));
  const geojsonv2 = makeGeoJsonFromCoordsArray(coordsArray);
  console.log(coords);
  console.log("geojsonv2", geojsonv2);
};

module.exports = { generateGeoJsonV2 };

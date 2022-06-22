const { db } = require("../../../shared/infra/database/firebase");
const { getCoordinatesFromAddress } = require("../http/geocoder");

const makeGeoJsonFromCoordsArray = (coordsArray) => {
  const bbox = getBBoxOfCoordsArray(coordsArray);
  const type = "LineString";
  const coordinates = [];
  for (const coords of coordsArray) {
    coordinates.push([coords.lng, coords.lat]);
  }
  const geoJson = JSON.stringify({
    coordinates,
    type,
    bbox,
  });
  return geoJson;
};

const getBBoxOfCoordsArray = (coordsArray) => {
  let downLat = 0,
    topLat = -90,
    leftLong = 0,
    rightLong = -180;
  for (const coords of coordsArray) {
    if (coords.lat < downLat) downLat = coords.lat;
    if (coords.lat > topLat) topLat = coords.lat;
    if (coords.lng < leftLong) leftLong = coords.lng;
    if (coords.lng > rightLong) rightLong = coords.lng;
  }
  return [leftLong, downLat, rightLong, topLat];
};

const getFT = async (ftDocId, transpId) => {
  // const transpId = "sPoryp9HSLenEbzlYQTq";
  const ft = await db
    .collection("companies/" + transpId + "/fts")
    .doc(ftDocId)
    // .where("Nº da FT", "==", vinculo["Ficha Técnica"])
    .get()
    .then((doc) => {
      return doc.data();
    });

  return ft;
};

const sortBySequencia = (i1, i2) => i1.Sequencia - i2.Sequencia;

const makeGeoJsonFromItineraries = async (itineraries, transpId) => {
  // const data = await getFT(ftDocId);
  // const ftNumber = ft["Nº da Linha"];
  // const itineraries = await getItineraries(ftNumber, transpId);
  // if (itineraries.length === 0) return;
  const sorted = itineraries.sort(sortBySequencia);
  const coordsArray = [];
  for (const i of sorted) {
    const address = i["Endereço"];
    const coordinates = await getCoordinatesFromAddress(address);
    if (coordinates) coordsArray.push(coordinates);
  }
  //   console.log(coordsArray);
  return makeGeoJsonFromCoordsArray(coordsArray);
};

// makeGeoJsonFromFT("b1vMfAj4FehcBv2XXxNr").then((result) => {
//   console.log(result);
// });

module.exports = { makeGeoJsonFromItineraries, sortBySequencia };

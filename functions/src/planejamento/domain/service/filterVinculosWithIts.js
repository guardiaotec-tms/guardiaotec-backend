const {
  getItineraries,
} = require("../../../shared/infra/repository/getItineraries");
const {
  sortBySequencia,
} = require("../../infra/service/makeGeoJsonFromItineraries");

// const hasItineraries = async (lineNumber, transpId) => {
//   return its.length > 0;
// };

const filterVinculosWithIts = async (vinculosMap, transpId) => {
  const test = [];
  let filteredVinculosMap = {};
  let i = 0,
    j = 0;
  for (const ftn in vinculosMap) {
    // i += 1;
    // console.log("i", i);
    const lineNumber = vinculosMap[ftn]["Plano de Viagem"];
    test.push([lineNumber, transpId]);
    const its = await getItineraries(lineNumber, transpId);
    if (its.length > 0) {
      const sorted = its.sort(sortBySequencia);
      // console.log(!!filteredVinculosMap[ftn]);
      filteredVinculosMap[ftn] = {
        ...vinculosMap[ftn],
        its: sorted,
      };
    }
  }

  // console.log(Object.entries(vinculosMap).length);
  // console.log(Object.entries(filteredVinculosMap).length);

  return filteredVinculosMap;
};

module.exports = { filterVinculosWithIts };

const {
  getItineraries,
} = require("../../../shared/infra/repository/getItineraries");

// const hasItineraries = async (lineNumber, transpId) => {
//   return its.length > 0;
// };

const filterVinculosWithIts = async (vinculosMap, transpId) => {
  const test = [];
  let filteredVinculosMap = {};
  for (const ftn in vinculosMap) {
    const lineNumber = vinculosMap[ftn]["Plano de Viagem"];
    test.push([lineNumber, transpId]);
    const its = await getItineraries(lineNumber, transpId);
    if (its.length > 0) {
      filteredVinculosMap[ftn] = {
        ...vinculosMap[ftn],
        its,
      };
    }
  }
  return filteredVinculosMap;
};

module.exports = { filterVinculosWithIts };

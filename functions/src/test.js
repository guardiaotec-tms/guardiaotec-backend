const { db } = require("./shared/infra/database/firebase");
const { getFts } = require("./shared/infra/repository");
const { getItineraries } = require("./shared/infra/repository/getItineraries");

const test = async () => {
  const transpId = "RpKzltId6ILwTt9FYemZ";
  const fts = await getFts(transpId);
  for (const ft of fts) {
    const its = await getItineraries(ft["Nº da Linha"], transpId);
    console.log(its.length);
  }
};

// func();
module.exports = { test };

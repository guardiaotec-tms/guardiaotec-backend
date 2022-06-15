// const { db } = require("../firebase");

const { db } = require("../database/firebase");

const getItineraries = async (lineNumber, transpId) => {
  const its = [];
  await db
    .collection(`companies/${transpId}/itineraries`)
    .where("LTU Correspondente", "==", lineNumber)
    .get()
    .then((qs) => {
      qs.forEach((doc) => {
        its.push(doc.data());
      });
    });

  return its;
};

module.exports = {
  getItineraries,
};

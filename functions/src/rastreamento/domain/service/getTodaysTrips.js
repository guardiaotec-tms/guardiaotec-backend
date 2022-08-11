const { db } = require("../../../shared/infra/database/firebase");
const {
  getCurrentFormattedDate,
} = require("../../../shared/infra/service/getCurrentFormattedDate");

const getTodaysTrips = async () => {
  const today = getCurrentFormattedDate();
  const trips = [];
  await db
    .collection(`trackingHelperDataStructures/eds/${today}`)
    .get()
    .then((qs) => qs.forEach((doc) => trips.push(doc.data())));

  return trips;
};

module.exports = { getTodaysTrips };

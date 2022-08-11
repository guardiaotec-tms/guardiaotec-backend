const { db } = require("../../../shared/infra/database/firebase");
const {
  getCurrentHour,
} = require("../../../shared/infra/service/getCurrentHour");
const {
  tripRangeArray,
} = require("../../../shared/infra/service/tripRangeArray");
const { getCurrentCoords } = require("./getCurrentCoords");
const { saveNewCoords } = require("./saveNewCoords");

const filterEventsByPlate = (latestEvents, licensePlate) => {
  return latestEvents.filter((e) => licensePlate.trim() === e.placa.trim());
};

const getEventsCoords = (events) => {
  return events.map((event) => ({
    coord: [event.longitude, event.latitude],
    recordedAt: new Date(),
  }));
};

const isActiveTrip = async (ftn) => {
  currentHour = getCurrentHour();
  const { horarioInicio, horarioFim } = await db
    .doc(`watchedFTs/${ftn}`)
    .get()
    .then((doc) => doc.data());

  // // console.log(data);
  // return false;
  // console.log(currentHour, horarioInicio, horarioFim);
  const range = tripRangeArray(horarioInicio, horarioFim);
  return range.includes(Number(currentHour));
};

const updateFTGeometry = async (latestEvents, ftPlateMap, licensePlate) => {
  const ftn = ftPlateMap[licensePlate];

  //if now is not a time of active trip, return
  if (!(await isActiveTrip(ftn))) {
    // console.log("continuing in updateGeometry ftn: ", ftn);
    return;
  }

  // console.log("not continuing in updateGeometry ftn: ", ftn);

  const relatedEvents = filterEventsByPlate(latestEvents, licensePlate);
  // console.log(licensePlate, relatedEvents.length);
  const newCoords = getEventsCoords(relatedEvents);
  const currentCoords = await getCurrentCoords(ftn);
  const unitedCoords = currentCoords.concat(newCoords);
  await saveNewCoords(ftn, unitedCoords);
};

module.exports = { updateFTGeometry };

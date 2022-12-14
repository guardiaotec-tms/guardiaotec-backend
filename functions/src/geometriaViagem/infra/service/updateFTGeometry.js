const { db } = require("../../../shared/infra/database/firebase");
const {
  getCurrentHour,
} = require("../../../shared/infra/service/getCurrentHour");
const {
  tripRangeArray,
} = require("../../../shared/infra/service/tripRangeArray");
const { equipmentDateFromString } = require("./equipmentDateFromString");
const { getCurrentCoords } = require("./getCurrentCoords");
const { saveNewCoords } = require("./saveNewCoords");

const filterEventsByPlate = (latestEvents, licensePlate) => {
  return latestEvents.filter((e) => licensePlate.trim() === e.placa.trim());
};

const getEventsCoords = (events) => {
  return events.map((event) => ({
    coord: [event.longitude, event.latitude],
    // recordedAt: new Date(),
    recordedAt: equipmentDateFromString(event.dataEquipamento),
  }));
};

const isActiveTrip = async (ftn) => {
  currentHour = getCurrentHour();
  const { horarioInicio, horarioFim } = await db
    .doc(`watchedFTs/${ftn}`)
    .get()
    .then((doc) => doc.data());

  const range = tripRangeArray(horarioInicio, horarioFim);
  return range.includes(Number(currentHour));
};

const haveSameCoords = (c1, c2) => {
  return c1.coord[0] === c2.coord[0] && c1.coord[1] === c2.coord[1];
};

const filterEqualCoords = (coords) => {
  const filtered = [];
  for (const coord of coords) {
    const found = filtered.find((c) => haveSameCoords(c, coord));
    if (found) {
      console.log("continuing in filterEqualTimes");
      continue;
    }
    filtered.push(coord);
  }
  return filtered;
};

const updateFTGeometry = async (latestEvents, ftPlateMap, licensePlate) => {
  const ftn = ftPlateMap[licensePlate];
  if (!(await isActiveTrip(ftn))) {
    return;
  }
  const relatedEvents = filterEventsByPlate(latestEvents, licensePlate);
  const newCoords = getEventsCoords(relatedEvents);
  // const withoutEqualTimes = filterEqualTimes(newCoords);
  const currentCoords = await getCurrentCoords(ftn);
  const unitedCoords = currentCoords.concat(newCoords);
  const withoutEqualTimes = filterEqualCoords(unitedCoords);
  await saveNewCoords(ftn, withoutEqualTimes);
};

module.exports = { updateFTGeometry };

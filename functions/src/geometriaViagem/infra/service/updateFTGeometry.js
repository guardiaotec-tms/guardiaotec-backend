const { getCurrentCoords } = require("./getCurrentCoords");
const { saveNewCoords } = require("./saveNewCoords");

const filterEventsByPlate = (latestEvents, licensePlate) => {
  return latestEvents.filter((e) => licensePlate === e.placa);
};

const getEventsCoords = (events) => {
  return events.map((event) => [event.longitude, event.latitude]);
};

const updateFTGeometry = async (latestEvents, ftPlateMap, licensePlate) => {
  const relatedEvents = filterEventsByPlate(latestEvents, licensePlate);
  console.log(licensePlate, relatedEvents.length);
  const newCoords = getEventsCoords(relatedEvents);
  const ftn = ftPlateMap[licensePlate];
  const currentCoords = await getCurrentCoords(ftn);
  const unitedCoords = currentCoords.concat(newCoords);
  await saveNewCoords(ftn, unitedCoords);
};

module.exports = { updateFTGeometry };

const findLatestTripEvents = (trip, events) => {
  const plate = trip.plannedTrip.plannedVehicle.licensePlate;
  const tripEvents = events.filter((e) => e.placa === plate);
  return tripEvents;
};

module.exports = { findLatestTripEvents };

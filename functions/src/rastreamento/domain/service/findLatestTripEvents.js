const includes = (e, plate) => {
  // const ps = ["DEI3G78", "EVW5130", "RNU1B81", "RKV4J53"];
  // for (const p of ps) {
  //   if (e.placa.includes(p) && plate.includes(p)) {
  //     // console.log(e);
  //     console.log(e.placa);
  //     console.log(plate);
  //     console.log(e.placa.length);
  //     console.log(plate.length);
  //     console.log(e.placa.trim() === plate);
  //   }
  // }
  // return false;
};

const findLatestTripEvents = (trip, events) => {
  let plate = trip.plannedTrip.plannedVehicle.licensePlate;
  // plate = plate.trim();
  const tripEvents = events.filter((e) => {
    includes(e, plate);
    return e.placa.trim() === plate;
  });
  return tripEvents;
};

module.exports = { findLatestTripEvents };

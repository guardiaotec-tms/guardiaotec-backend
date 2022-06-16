const {
  getCurrentHour,
} = require("../../../shared/infra/service/getCurrentHour");
const {
  tripRangeArray,
} = require("../../../shared/infra/service/tripRangeArray");
const { getTodaysTrips } = require("./getTodaysTrips");

const findCurrentActiveTrips = async () => {
  let currentHour = getCurrentHour();
  const todaysTrips = await getTodaysTrips();

  const currentTrips = todaysTrips.filter((t) => {
    const range = tripRangeArray(t.horarioInicio, t.horarioFim);
    return range.includes(currentHour);
  });

  return currentTrips;
};

module.exports = {
  findCurrentActiveTrips,
};

const { getFts } = require("../repository");
const { getCurrentDayOfWeek, weekDayMap } = require("./getCurrentDayOfWeek");

const findTodayTrips = async (company) => {
  const fts = await getFts(company.id);
  const dayOfWeek = getCurrentDayOfWeek();
  const todayFts = fts.filter((ft) => {
    return ft["Frequência"].includes(weekDayMap[dayOfWeek]);
  });
  return todayFts;
};

module.exports = {
  findTodayTrips,
};

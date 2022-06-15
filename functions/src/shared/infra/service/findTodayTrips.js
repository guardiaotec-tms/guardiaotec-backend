const { getFts } = require("../utils/dbUtils");
const { getCurrentDayOfWeek, weekDayMap } = require("./getCurrentDayOfWeek");

const findTodayTrips = async (company) => {
  const fts = await getFts(company.id);
  const dayOfWeek = getCurrentDayOfWeekk();
  const todayFts = fts.filter((ft) => {
    return ft["Frequência"].includes(weekDayMap[dayOfWeek]);
  });
  return todayFts;
};

module.exports = {
  findTodayTrips,
};

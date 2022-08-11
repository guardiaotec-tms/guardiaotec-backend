const { db } = require("../../../shared/infra/database/firebase");
const {
  getCurrentFormattedDate,
} = require("../../../shared/infra/service/getCurrentFormattedDate");

const uploadLatestEventsSummary = async (events) => {
  if (!events || events.length === 0) return;
  const today = getCurrentFormattedDate();
  db.collection(`latestEventsSummary/data/${today}`).add({
    plates: events.map((e) => e.placa),
    createdAt: new Date(),
  });
};

module.exports = { uploadLatestEventsSummary };

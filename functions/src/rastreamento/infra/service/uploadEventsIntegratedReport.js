const { db } = require("../../../shared/infra/database/firebase");
const {
  getCurrentFormattedDate,
} = require("../../../shared/infra/service/getCurrentFormattedDate");

const uploadEventsIntegratedReport = async (integratedPlates) => {
  if (integratedPlates.length === 0) return;
  // console.log(integratedPlates);
  // console.log("la");
  const plates = integratedPlates.map((ip) => ip.placa);
  const data = { integratedAt: new Date(), plates };

  db.collection(`integratedPlates/data/${getCurrentFormattedDate()}`).add(data);
};

module.exports = { uploadEventsIntegratedReport };

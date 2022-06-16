const { db } = require("../../../shared/infra/database/firebase");

const saveResponse = async (response, trip, time) => {
  const { error, message, success, warning } = response;
  const ft = trip["Nº da FT"];
  const { transpId, transportadora } = trip;
  const createdAt = new Date();

  const [day, hour] = time.split(" ");
  const [hours, minutes] = hour.split(":");
  createdAt.setHours(Number(hours) + 3);
  createdAt.setMinutes(Number(minutes));

  const tmsReport = {
    status: success ? "success" : "error",
    createdAt,
    ft,
    transpId: transpId || ``,
    transportadora,
    message,
  };

  db.collection("tmsReports").add(tmsReport);
};

module.exports = { saveResponse };

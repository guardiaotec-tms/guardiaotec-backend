const { db } = require("../../../shared/infra/database/firebase");

const saveResponse = async (response, trip) => {
  const { error, message, success, warning } = response;
  const ft = trip["Nº da FT"];
  const { transpId, transportadora } = trip;
  const createdAt = new Date();

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

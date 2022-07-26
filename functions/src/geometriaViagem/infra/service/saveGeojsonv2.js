const { db } = require("../../../shared/infra/database/firebase");

const saveGeojsonv2 = async (geojsonv2, company, ftn) => {
  await db.doc(`companies/${company.id}/geojsons/${ftn}`).update({ geojsonv2 });
};

module.exports = { saveGeojsonv2 };

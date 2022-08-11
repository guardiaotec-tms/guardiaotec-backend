const { db } = require("../../../shared/infra/database/firebase");

const ftHasGeoJsonV2 = async (company, ftn) => {
  const geojsonsDoc = await db
    .doc(`companies/${company.id}/geojsons/${ftn}`)
    .get()
    .then((doc) => doc.data());
  if (!geojsonsDoc) {
    return false;
  }
  return !!geojsonsDoc.geojsonv2;
};
module.exports = { ftHasGeoJsonV2 };

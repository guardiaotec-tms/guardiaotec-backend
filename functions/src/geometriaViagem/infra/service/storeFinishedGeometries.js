const { db } = require("../../../shared/infra/database/firebase");
const { getFts } = require("../../../shared/infra/repository");
const { filterFTsWithoutGeojsonV2 } = require("./filterFTsWithoutGeojsonV2");
const { generateGeoJsonV2 } = require("./generateGeoJsonV2");
const { saveGeojsonv2 } = require("./saveGeojsonv2");
const { updateWatchedFTStatus } = require("./updateWatchedFTStatus");

class StoreFinishedGeometries {
  constructor() {
    this.coords = {};
  }

  getWatchedFTDoc = async (ftn) => {
    return await db
      .doc(`watchedFTs/${ftn}`)
      .get()
      .then((doc) => doc.data());
  };

  getCoords = async (ftn) => {
    const doc = await this.getWatchedFTDoc(ftn);
    if (!doc) return [];
    // const coords = JSON.parse(doc.coords);
    const coords = doc.coords;
    this.coords[ftn] = coords;
    return coords;
  };

  isFinishedGeometry = async (ft) => {
    const ftn = ft["Nº da FT"];
    const coords = await this.getCoords(ftn);
    return coords.length > 15;
  };

  findFinishedGeometries = async (fts) => {
    const finished = [];
    for (const ft of fts) {
      if (await this.isFinishedGeometry(ft)) finished.push(ft);
    }
    console.log(`finished geometries today: ${finished.length}`);
    const f = {};
    for (const ft of finished) {
      const ftn = ft["Nº da FT"];
      f[ftn] = this.coords[ftn];
    }
    return f;
  };

  //  storeFinishedGeometries = async (fts) => {
  // main = async (company, fts) => {
  main = async (company) => {
    const fts = await getFts(company.id);
    const ftsWithoutGeojsonV2 = await filterFTsWithoutGeojsonV2(company, fts);
    const finishedGeometries = await this.findFinishedGeometries(
      ftsWithoutGeojsonV2
    );
    for (const ftn in finishedGeometries) {
      const geojsonv2 = await generateGeoJsonV2(
        company,
        ftn,
        finishedGeometries[ftn]
      );
      await saveGeojsonv2(geojsonv2, company, ftn);
      console.log(`saved geojsonV2 for ftn: ${ftn}`);
      await updateWatchedFTStatus(ftn, "finished");
    }

    return fts.filter((ft) => !(ft["Nº da FT"] in finishedGeometries));
  };
}

module.exports = { StoreFinishedGeometries };

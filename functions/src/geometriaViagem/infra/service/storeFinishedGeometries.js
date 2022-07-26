const { db } = require("../../../shared/infra/database/firebase");
const { generateGeoJsonV2 } = require("./generateGeoJsonV2");

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
    const coords = JSON.parse(doc.coords);
    this.coords[ftn] = coords;
    return coords;
  };

  isFinishedGeometry = async (ft) => {
    const ftn = ft["Nº da FT"];
    const coords = await this.getCoords(ftn);
    return coords.length > 0;
  };

  findFinishedGeometries = async (fts) => {
    const finished = [];
    for (const ft of fts) {
      if (await this.isFinishedGeometry(ft)) finished.push(ft);
    }
    const f = {};
    for (const ft of finished) {
      const ftn = ft["Nº da FT"];
      f[ftn] = this.coords[ftn];
    }
    return f;
  };

  //  storeFinishedGeometries = async (fts) => {
  main = async (company, fts) => {
    const finishedGeometries = await this.findFinishedGeometries(fts);
    for (const ftn in finishedGeometries) {
      generateGeoJsonV2(company, ftn, finishedGeometries[ftn]);
    }

    // const notFinished = {}
    // for(const ftn in fts){

    // }
    return fts.filter((ft) => !(ft["Nº da FT"] in finishedGeometries));
  };
}

module.exports = { StoreFinishedGeometries };

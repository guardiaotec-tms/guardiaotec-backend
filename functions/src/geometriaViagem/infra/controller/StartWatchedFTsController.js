const {
  getCompanies,
  findVinculosFromFts,
} = require("../../../shared/infra/repository");
const {
  findTodayTrips,
} = require("../../../shared/infra/service/findTodayTrips");
const { ftHasGeoJsonV2 } = require("../service/ftHasGeoJsonV2");
const { uploadWatchedFTDoc } = require("../service/uploadWatchedFTDoc");

class StartWatchedFTsController {
  constructor() {}

  async startWatchFT(ft) {}

  async startCompanyWatchedFTs(company) {
    const todaysTripsFts = await findTodayTrips(company);

    const withoutGeoJsonV2 = [];
    for (const ft of todaysTripsFts) {
      const ftn = ft["Nº da FT"];
      const has = await ftHasGeoJsonV2(company, ftn);
      if (has) console.log("continuing ftn: ", ftn);
      if (!has) withoutGeoJsonV2.push(ft);
    }

    let todaysFtsVinculos = await findVinculosFromFts(
      company.id,
      withoutGeoJsonV2
    );
    for (const ftn in todaysFtsVinculos) {
      const v = todaysFtsVinculos[ftn];
      console.log(v["Veículo"], v["Ficha Técnica"]);
      const watchedFTsDocData = {
        placa: v["Veículo"],
        status: "active",
        coords: "[]",
      };
      //   await uploadWatchedFTDoc(ftn, watchedFTsDocData);
    }
  }

  async main() {
    const companies = await getCompanies();
    console.log(companies);
    for (const company of companies) {
      this.startCompanyWatchedFTs(company);
    }
  }
}

module.exports = {
  StartWatchedFTsController,
};

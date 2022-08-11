const {
  getCompanies,
  findVinculosFromFts,
} = require("../../../shared/infra/repository");
const {
  findTodayTrips,
} = require("../../../shared/infra/service/findTodayTrips");
const { addToWatchedFTs } = require("../service/addToWatchedFTs");
const {
  filterFTsWithoutGeojsonV2,
} = require("../service/filterFTsWithoutGeojsonV2");
const { ftHasGeoJsonV2 } = require("../service/ftHasGeoJsonV2");
const {
  StoreFinishedGeometries,
} = require("../service/StoreFinishedGeometries");
const { uploadWatchedFTDoc } = require("../service/uploadWatchedFTDoc");

class StartWatchedFTsController {
  constructor() {}

  // async startWatchFT(ft) {}

  async startCompanyWatchedFTs(company) {
    // salva as terminadas ontem
    await new StoreFinishedGeometries().main(company);

    // prepara as que devem ser feitas hoje
    const todaysTripsFts = await findTodayTrips(company);
    const withoutGeoJsonV2 = await filterFTsWithoutGeojsonV2(
      company,
      todaysTripsFts
    );
    await addToWatchedFTs(company, withoutGeoJsonV2);
  }

  async main() {
    const companies = await getCompanies();
    // this.startCompanyWatchedFTs(companies[0]);
    for (const company of companies) {
      try {
        await this.startCompanyWatchedFTs(company);
      } catch (error) {
        console.log(
          "Error in StartWatchedFTsController.main():",
          error.message
        );
      }
    }
  }
}

module.exports = {
  StartWatchedFTsController,
};

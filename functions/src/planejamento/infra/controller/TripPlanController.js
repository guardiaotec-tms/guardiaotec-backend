const {
  findVinculosFromFts,
  getCompanies,
} = require("../../../shared/infra/repository");
const {
  findTodayTrips,
} = require("../../../shared/infra/service/findTodayTrips");
const {
  filterVinculosWithIts,
} = require("../../domain/service/filterVinculosWithIts");
const { findTripTimeRange } = require("../../domain/service/findTripTimeRange");
const { makePlantripJson } = require("../../domain/service/makePlantripJson");
const { dispatchJsonToCorreios } = require("../http/dispatchJsonToCorreios");
const { EdController } = require("./EdController");

class TripPlanController {
  constructor() {
    this.edController = new EdController();
  }

  integrateTrip = async (vinculo, transpId) => {
    const ftNumber = vinculo["Ficha Técnica"];
    try {
      const { plantripJson, driverNumber } = await makePlantripJson(
        transpId,
        vinculo
      );
      const response = await dispatchJsonToCorreios(plantripJson);
      const ed = this.edController;
      ed.setPlanTripResponse(ftNumber, response);
      ed.setPlanTrip(ftNumber, plantripJson);
      ed.setDriverNumber(ftNumber, driverNumber);
      const { horarioFim, horarioInicio } = await findTripTimeRange(
        vinculo,
        transpId
      );
      ed.setHorarioFim(ftNumber, horarioFim);
      ed.setHorarioInicio(ftNumber, horarioInicio);
      await ed.saveFtData(ftNumber);
    } catch (error) {
      console.log(
        `Não foi possível integrar a ficha ${ftNumber}. Erro: ${error.message}`
      );
    }
  };

  storeTripInfoInED = (tripInfo) => {
    const { todaysTripsFts, ftNumber, company, vinculo } = tripInfo;
    const ft = todaysTripsFts.find((ft) => ft["Nº da FT"] === ftNumber);
    this.edController.addFt(ftNumber, ft);
    this.edController.setTranspName(ftNumber, company.Transportadora);
    this.edController.setTranspId(ftNumber, company.id);
    this.edController.setAberturaLinha(ftNumber, vinculo.its[0].Chegada);
  };

  integrateCompanyTrips = async (company) => {
    console.log("Integrando ", company.Transportadora);
    const todaysTripsFts = await findTodayTrips(company);

    let todaysFtsVinculos = await findVinculosFromFts(
      company.id,
      todaysTripsFts
    );

    const withIts = await filterVinculosWithIts(todaysFtsVinculos, company.id);

    for (const ftNumber in withIts) {
      const vinculo = withIts[ftNumber];
      if (!vinculo.its) {
        console.log("Vinculo does not have its. Continuing.");
        continue;
      }
      this.storeTripInfoInED({ todaysTripsFts, ftNumber, company, vinculo });
      await this.integrateTrip(vinculo, company.id);
    }
  };

  main = async () => {
    try {
      const companies = await getCompanies();
      const promises = companies.map((company) => {
        return this.integrateCompanyTrips(company);
      });
      await Promise.all(promises).then(() => {
        // this.edController.saveEd();
        console.log("Concluído.");
      });
      // .catch((error) => {
      //   console.log("Loging from planning main()", error.message);
      // });
    } catch (error) {
      console.log(
        "Erro na integração do planejamento em main(): ",
        error.message
      );
    }
  };
}

module.exports = {
  TripPlanController,
};

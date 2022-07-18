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
    // console.log("to no integrateTrip");
    const { plantripJson, driverNumber } = await makePlantripJson(
      transpId,
      vinculo
    );
    // console.log("fiz o makePlanTripJson");
    const response = await dispatchJsonToCorreios(plantripJson);
    // console.log("despachei to correios");
    const ftNumber = vinculo["Ficha Técnica"];
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
    // console.log("foundtodaytrips");
    // console.log(todaysTripsFts.length);
    let todaysFtsVinculos = await findVinculosFromFts(
      company.id,
      todaysTripsFts
    );
    // console.log("foundvinculosfromfts");
    // console.log(todaysTripsFts.length);

    const withIts = await filterVinculosWithIts(todaysFtsVinculos, company.id);
    // console.log(Object.entries(withIts).length);
    for (const key in withIts) {
      // console.log(key);
    }

    // console.log("vou começar o laço do withIts");
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
    const companies = await getCompanies();
    // const companies = [
    //   {
    //     Transportadora: "Rra Servicos e Transportes",
    //     CNPJ: "17.073.401/0001-74",
    //     Contato: "1147522370",
    //     Email: "rra.transportes@bol.com.br",
    //     Responsável: "RONE",
    //     id: "RpKzltId6ILwTt9FYemZ",
    //   },
    // ];
    // for (const company of companies) {
    //   this.integrateCompanyTrips(company);
    // }
    const promises = companies.map((company) => {
      // console.log(company.id);
      return this.integrateCompanyTrips(company);
    });
    Promise.all(promises)
      .then(() => {
        this.edController.saveEd();
      })
      .then(() => {
        console.log("Concluído.");
      });
  };
}

module.exports = {
  TripPlanController,
};

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
    const { plantripJson, driverNumber } = await makePlantripJson(
      transpId,
      vinculo
    );
    // console.log(plantripJson);
    const response = await dispatchJsonToCorreios(plantripJson);
    console.log("correios response:", response);
    console.log("ft:", vinculo["Ficha Técnica"]);

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
    // console.log("to aqui");
    const companies = await getCompanies();
    // const companies = [
    //   {
    //     Transportadora: "JUS TRANSPORTES",
    //     CNPJ: "39342625000177",
    //     Contato: "061992713809",
    //     Email: "TRANSPORTESJUS@GMAIL.COM",
    //     Responsável: "MARCOS ",
    //     id: "sPoryp9HSLenEbzlYQTq",
    //   },
    // ];

    // for (const company of companies) {
    //   this.integrateCompanyTrips(company);
    // }
    const promises = companies.map((company) =>
      this.integrateCompanyTrips(company)
    );
    Promise.all(promises).then(() => {
      this.edController.saveEd();
    });
  };
}

module.exports = {
  TripPlanController,
};

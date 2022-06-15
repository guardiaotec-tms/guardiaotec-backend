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

  integrateCompanyTrips = async (company) => {
    const todaysTripsFts = await findTodayTrips(company);
    let todaysFtsVinculos = await findVinculosFromFts(
      company.id,
      todaysTripsFts
    );

    const withIts = await filterVinculosWithIts(todaysFtsVinculos, company.id);

    for (const ftNumber in withIts) {
      const ft = todaysTripsFts.find((ft) => ft["Nº da FT"] === ftNumber);
      this.edController.addFt(ftNumber, ft);
      this.edController.setTranspName(ftNumber, company.Transportadora);
      const vinculo = withIts[ftNumber];
      await this.integrateTrip(vinculo, company.id);
    }
  };

  main = async () => {
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
    for (const company of companies) {
      await this.integrateCompanyTrips(company);
    }
    this.edController.saveEd();
  };
}

module.exports = {
  TripPlanController,
};

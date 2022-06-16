const { db } = require("../../../shared/infra/database/firebase");
const {
  getCurrentFormattedDate,
} = require("../../../shared/infra/service/getCurrentFormattedDate");

class EdController {
  constructor() {
    this.ed = {};
  }

  addFt(ftNumber, ft) {
    this.ed[ftNumber] = ft;
  }

  addFts(fts) {
    for (const ft of fts) {
      this.ed[ft["Nº da FT"]] = ft;
    }
  }

  setPlanTripResponse(ftNumber, response) {
    this.ed[ftNumber].planTripResponse = response;
  }

  setPlanTrip(ftNumber, plantrip) {
    this.ed[ftNumber].plannedTrip = plantrip;
  }

  setTranspName(ftNumber, name) {
    this.ed[ftNumber].transportadora = name;
  }

  setDriverNumber(ftNumber, driverNumber) {
    this.ed[ftNumber].driverNumber = driverNumber;
  }

  setHorarioFim(ftNumber, horarioFim) {
    // horarioFim.setHours();
    horarioFim = horarioFim.getHours() + 1 - 3;
    this.ed[ftNumber].horarioFim = horarioFim;
  }

  setHorarioInicio(ftNumber, horarioInicio) {
    horarioInicio = horarioInicio.getHours() - 3;
    this.ed[ftNumber].horarioInicio = horarioInicio;
  }

  async saveEd() {
    console.log("agora é a hora de salvar a tal da ed! logando ela:");
    // console.log(this.ed);
    for (const ftNumber in this.ed) {
      await db
        .doc(
          `trackingHelperDataStructures/eds/${getCurrentFormattedDate()}/${ftNumber}`
        )
        .set(this.ed[ftNumber]);
    }
  }
}

module.exports = {
  EdController,
};

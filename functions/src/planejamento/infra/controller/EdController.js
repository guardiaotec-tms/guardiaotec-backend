const { db } = require("../../../shared/infra/database/firebase");
const {
  getCurrentFormattedDate,
} = require("../../../shared/infra/service/getCurrentFormattedDate");
const { mergeHourWithToday } = require("../service/mergeHourWithToday");

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

  setTranspId(ftNumber, id) {
    this.ed[ftNumber].transpId = id;
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

  setAberturaLinha(ftNumber, aberturaLinha) {
    // console.log(aberturaLinha);
    this.ed[ftNumber].aberturaLinha = aberturaLinha;
  }

  makeTMSPlanningReport(ftNumber) {
    const ed = this.ed[ftNumber];
    const tmsPlanningReport = {};
    tmsPlanningReport.linha = ed["Nº da Linha"];
    tmsPlanningReport.placa = ed.plannedTrip.plannedVehicle.licensePlate;
    tmsPlanningReport.horarioEnvio = new Date();
    // tmsPlanningReport.aberturaLinha = ed.aberturaLinha;
    tmsPlanningReport.aberturaLinha = mergeHourWithToday(
      ed.aberturaLinha.toDate()
    );
    // mergeHourWithToday(ed.aberturaLinha.toDate());
    tmsPlanningReport.ft = ftNumber;
    tmsPlanningReport.codigoTMS = ed.planTripResponse.Item;
    tmsPlanningReport.transpId = ed.transpId;
    tmsPlanningReport.transportadora = ed.transportadora;
    tmsPlanningReport.resultado = ed.planTripResponse.Error
      ? "Erro"
      : "Sucesso";
    return tmsPlanningReport;
  }

  async saveEd() {
    console.log("agora é a hora de salvar a tal da ed! logando ela:");
    // console.log(this.ed);
    for (const ftNumber in this.ed) {
      db.doc(
        `trackingHelperDataStructures/eds/${getCurrentFormattedDate()}/${ftNumber}`
      ).set(this.ed[ftNumber]);
    }

    console.log("hora de salvar os tmsPlanningReports");
    for (const ftNumber in this.ed) {
      const report = this.makeTMSPlanningReport(ftNumber);
      db.collection(
        `tmsPlanningReports/${getCurrentFormattedDate()}/reports`
      ).add(report);
    }
  }
}

module.exports = {
  EdController,
};

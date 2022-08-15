const { db } = require("../../../shared/infra/database/firebase");
const {
  getCurrentFormattedDate,
} = require("../../../shared/infra/service/getCurrentFormattedDate");
const { mergeHourWithToday } = require("../service/mergeHourWithToday");

class EdController {
  constructor() {
    this.ed = {};
    this.today = getCurrentFormattedDate();
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
    if ([0, 1, 2].includes(horarioFim)) horarioFim = 23;
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
    tmsPlanningReport.resultado =
      ed.planTripResponse.Error || ed.planTripResponse.Item === 0
        ? "Erro"
        : "Sucesso";
    tmsPlanningReport.mensagem = ed.planTripResponse.Message;
    return tmsPlanningReport;
  }

  async saveHelperData(ftNumber, today) {
    await db
      .doc(`trackingHelperDataStructures/eds/${today}/${ftNumber}`)
      .set(this.ed[ftNumber]);
  }

  async saveReportData(ftNumber, today) {
    const report = this.makeTMSPlanningReport(ftNumber);
    await db
      .doc(`tmsPlanningReports/${today}/reports/${report.ft}`)
      .set(report);
  }

  async saveFtData(ftNumber) {
    await this.saveHelperData(ftNumber, this.today);
    await this.saveReportData(ftNumber, this.today);
    console.log("Ficha integrada: ", ftNumber);
  }

  async saveEd() {
    console.log("\nIntegrações concluídas. Armazenando os dados.");

    for (const ftNumber in this.ed) {
      this.saveFtData(ftNumber);
    }
  }
}

module.exports = {
  EdController,
};

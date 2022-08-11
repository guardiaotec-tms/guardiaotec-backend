const {
  findCurrentActiveTrips,
} = require("../../domain/service/findCurrentActiveTrips");
const {
  findLatestTripEvents,
} = require("../../domain/service/findLatestTripEvents");
const {
  getPreviousTrackJson,
} = require("../../domain/service/getPreviousTrackJson");
const { makeTrackJson } = require("../../domain/service/makeTrackJson");
const {
  dispatchTrackJsonToCorreios,
} = require("../http/dispatchTrackJsonToCorreios");
const { dummyEvents } = require("../http/dummyEvents");
const { getLatestEvents } = require("../http/getLatestEvents");
const { saveResponse } = require("../service/saveResponse");
const {
  MakeGeometriesController,
} = require("../../../geometriaViagem/infra/controller/MakeGeometriesController");
const {
  uploadEventsIntegratedReport,
} = require("../service/uploadEventsIntegratedReport");
const { uploadError } = require("../../../shared/infra/service/uploadError");
const {
  uploadLatestEventsSummary,
} = require("../service/uploadLatestEventsSummary");

class TripTrackController {
  constructor() {
    this.latestEvents = [];
    this.eventsIntegrated = [];
    this.makeGeometriesController = new MakeGeometriesController();
  }

  async integrateEvent(trip, event) {
    const previousTrackJson = await getPreviousTrackJson(trip);
    //trip é a ed
    const trackJson = makeTrackJson(event, trip, previousTrackJson);
    const response = await dispatchTrackJsonToCorreios(trackJson);
    // saveResponse(response, trip, event.dataEquipamento);
    // this.eventsIntegrated += 1;
    this.eventsIntegrated.push({ placa: trackJson.placa });
  }

  async integrateTrip(trip) {
    const events = await findLatestTripEvents(trip, this.latestEvents);
    const ps = ["DEI3G78", "EVW5130"];
    let plate = trip.plannedTrip.plannedVehicle.licensePlate;
    // console.log(plate);
    if (ps.includes(plate)) {
      // const str = this.latestEvents.map((e) => e.placa).join(",");
      // console.log(str);
      // console.log(str.includes(plate));
      // console.log("plate", plate);
    }
    for (const event of events) {
      await this.integrateEvent(trip, event);
    }
  }

  async main() {
    try {
      const currentTrips = await findCurrentActiveTrips();
      this.latestEvents = await getLatestEvents();
      // this.latestEvents = dummyEvents();
      const promises = currentTrips.map((trip) => this.integrateTrip(trip));
      await Promise.all(promises).then(() => {
        console.log(this.eventsIntegrated.map((e) => e.placa).join(","));
        console.log("integrated " + this.eventsIntegrated.length + " events");
      });

      await this.makeGeometriesController.main(this.latestEvents);
      uploadEventsIntegratedReport(this.eventsIntegrated);
      uploadLatestEventsSummary(this.latestEvents);
    } catch (error) {
      console.log("Error in TripTrackController main: ", error.message);
      uploadError({
        where: "track_main",
        msg: "Error in TripTrackController main: " + error.message,
      });
    }
    // for (const trip of currentTrips) {
    // }
    /*
        encontre as viagens ativas agora
        para cada viagem ativa agora faça:
          monte o json de integração
          despacha pros correios
          salva a resposta da requisição
      */
  }
}

module.exports = {
  TripTrackController,
};

/**
 * 
 
16765497  RNV1C15
0 12
16765492  RNU1B81
0 1
16921366  JBA8A85
0 15
16765504  JAZ5E74
 */

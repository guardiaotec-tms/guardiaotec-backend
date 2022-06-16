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

class TripTrackController {
  constructor() {
    this.latestEvents = [];
    this.eventsIntegrated = 0;
  }

  async integrateEvent(trip, event) {
    const previousTrackJson = await getPreviousTrackJson(trip);
    //trip é a ed
    const trackJson = makeTrackJson(event, trip, previousTrackJson);
    const response = await dispatchTrackJsonToCorreios(trackJson);
    saveResponse(response, trip, event.dataEquipamento);
    this.eventsIntegrated += 1;
  }

  async integrateTrip(trip) {
    const events = await findLatestTripEvents(trip, this.latestEvents);
    for (const event of events) {
      await this.integrateEvent(trip, event);
    }
  }

  async main() {
    const currentTrips = await findCurrentActiveTrips();
    this.latestEvents = await getLatestEvents();

    const promises = currentTrips.map((trip) => this.integrateTrip(trip));
    Promise.all(promises).then(() => {
      console.log("integrated " + this.eventsIntegrated + " events");
    });
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

const functions = require("firebase-functions");
const { UsersManager } = require("./src/auth/UsersManager");
const {
  TripPlanController,
} = require("./src/planejamento/infra/controller/TripPlanController");
const {
  TripTrackController,
} = require("./src/rastreamento/infra/controller/TripTrackController");

exports.handleTripPlanningHttps = functions
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(async (request, response) => {
    const controller = new TripPlanController();
    await controller.main();
    response.json({ msg: "from trip planning" });
  });

exports.handleTripTrackingHttps = functions
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(async (request, response) => {
    const controller = new TripTrackController();
    await controller.main();
    response.json({ msg: "from trip tracking" });
  });

exports.deleteUser = functions
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");
    const controller = new UsersManager();
    await controller.deleteUser(req, res);
  });

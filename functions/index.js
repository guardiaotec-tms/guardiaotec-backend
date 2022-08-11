const functions = require("firebase-functions");
const { UsersManager } = require("./src/auth/UsersManager");
const {
  StartWatchedFTsController,
} = require("./src/geometriaViagem/infra/controller/StartWatchedFTsController");
const {
  getWatchedFTs,
} = require("./src/geometriaViagem/infra/service/getWatchedFTs");
// const { UsersManager } = require("./src/auth/UsersManager");
const {
  TripPlanController,
} = require("./src/planejamento/infra/controller/TripPlanController");
const {
  findCurrentActiveTrips,
} = require("./src/rastreamento/domain/service/findCurrentActiveTrips");
const {
  TripTrackController,
} = require("./src/rastreamento/infra/controller/TripTrackController");
const { test } = require("./src/test");

exports.handleTripPlanningHttps = functions
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(async (request, response) => {
    // console.log("to no planningg");
    const controller = new TripPlanController();
    await controller.main();
    response.json({ msg: "from trip planning" });
  });

// exports.test = functions
//   .runWith({ timeoutSeconds: 540 })
//   .https.onRequest(async (request, response) => {
//     const controller = new TripPlanController();
//     await controller.main();
//     response.json({ msg: "test completed" });
//   });

exports.handleTripTrackingHttps = functions
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(async (request, response) => {
    const controller = new TripTrackController();
    await controller.main();
    response.json({ msg: "from trip tracking" });
  });

exports.startWatchedFTsController = functions
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(async (request, response) => {
    const controller = new StartWatchedFTsController();
    await controller.main();
    response.json({ msg: "from trip startWatchedFTsController" });
  });

exports.deleteUser = functions
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");
    const controller = new UsersManager();
    await controller.deleteUser(req, res);
  });

exports.isBlockedUser = functions
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");
    const controller = new UsersManager();
    await controller.isBlockedUser(req, res);
  });

// exports.debugCurrentTrips = functions
//   .runWith({ timeoutSeconds: 540 })
//   .https.onRequest(async (req, res) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Methods", "GET, POST");
//     const currentTrips = await findCurrentActiveTrips();
//     console.log(currentTrips.map((ct) => ct["Nº da FT"]));
//     console.log(
//       currentTrips.map((ct) => ct.plannedTrip.plannedVehicle.licensePlate)
//     );

//     res.json("debugging currenttrips");
//   });

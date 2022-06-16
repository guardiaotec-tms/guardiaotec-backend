const functions = require("firebase-functions");
const {
  TripPlanController,
} = require("./src/planejamento/infra/controller/TripPlanController");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.handleTripPlanningHttps = functions
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(async (request, response) => {
    //   functions.logger.info("Hello logs!", {structuredData: true});
    //   response.send("Hello from Firebase!");
    const controller = new TripPlanController();
    await controller.main();
    console.log("magruat");
    response.json({ msg: "from trip planning" });
    // });
  });

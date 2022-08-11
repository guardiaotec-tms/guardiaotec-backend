process.NODE_ENV = "dev";
const {
  TripPlanController,
} = require("../planejamento/infra/controller/TripPlanController");

const main = async () => {
  const controller = new TripPlanController();
  await controller.main();
};

main();

const { getFTPlateMap } = require("../service/getFTPlateMap");
const { getWatchedCars } = require("../service/getWatchedCars");
const { updateFTGeometry } = require("../service/updateFTGeometry");

class MakeGeometriesController {
  constructor() {}

  async main(latestEvents) {
    const watchedCars = getWatchedCars();
    this.ftPlateMap = await getFTPlateMap();
    for (const car of watchedCars) {
      updateFTGeometry(latestEvents, this.ftPlateMap, car);
    }
    // console.log(latestEvents);
  }
}

module.exports = {
  MakeGeometriesController,
};

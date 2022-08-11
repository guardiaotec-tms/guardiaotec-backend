const { getFTPlateMap } = require("../service/getFTPlateMap");
const { getWatchedFTs } = require("../service/getWatchedFTs");
const { updateFTGeometry } = require("../service/updateFTGeometry");

class MakeGeometriesController {
  constructor() {}

  async main(latestEvents) {
    const watchedFTs = await getWatchedFTs();
    this.ftPlateMap = await getFTPlateMap();
    for (const ft of watchedFTs) {
      try {
        await updateFTGeometry(latestEvents, this.ftPlateMap, ft.placa);
      } catch (error) {
        console.log(
          "plate: ",
          ft.placa,
          " could not be integrated in updateFTGeometry"
        );
        console.log(error);
      }
    }
    // console.log(latestEvents);
  }
}

module.exports = {
  MakeGeometriesController,
};

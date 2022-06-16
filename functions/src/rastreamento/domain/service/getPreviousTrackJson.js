const { db } = require("../../../shared/infra/database/firebase");
const {
  getCurrentFormattedDate,
} = require("../../../shared/infra/service/getCurrentFormattedDate");

const getPreviousTrackJson = async (trip) => {
  try {
    const previousTrack = await db
      .doc(
        `trackingHelperDataStructures/previousTracks/${getCurrentFormattedDate()}/${
          trip.ftNumber
        }`
      )
      .get()
      .then((doc) => doc.data());

    return previousTrack;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getPreviousTrackJson,
};

const mapsAPIKey = "AIzaSyCs1NVgt-qRhf9bJamsxTANkw0TVIiKcfE";
var geocoder = require("google-geocoder");

var geo = geocoder({
  key: mapsAPIKey,
});

const getCoordinatesFromAddress = (address) => {
  return new Promise((resolve, rej) => {
    geo.find(address, function (err, res) {
      // process response object
      if (err) {
        console.log(err);
        rej(err.error_message);
      }
      if (res[0]) {
        resolve(res[0].location);
      }
      resolve();
    });
  });
};

// getCoordinatesFromAddress("Rua Potsdam 243");

module.exports = {
  getCoordinatesFromAddress,
};

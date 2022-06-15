const { default: axios } = require("axios");

const dispatchJsonToCorreios = async (planTripJson) => {
  console.log(planTripJson);

  planTripJson = {
    date: "15062022",
    idFicha: "15713114",
    geoJson:
      '{"coordinates":[[-47.98150589999999,-15.7944439],[-47.89044819999999,-15.7968316],[-47.98150589999999,-15.7944439],[-47.9585642,-15.8153261],[-47.98150589999999,-15.7944439],[-47.98150589999999,-15.7944439],[-47.89712850000001,-15.7379332],[-47.95044040000001,-15.8080049],[-47.98150589999999,-15.7944439]],"type":"LineString","bbox":[-47.98150589999999,-15.8153261,-47.89044819999999,-15.7379332]}',
    workflow: { id: 29 },
    plannedVehicle: {
      licensePlate: "RES1B06",
      additionalLicensePlate: "RES1B06",
      model: "MASTER",
      weight: 1500,
    },
    plannedDrivers: [
      {
        name: "WESLWY TELES E SILVA",
        personalId: "04655470562",
        functionalId: "04655470562",
      },
    ],
  };

  // const username = "ECTarcgis";
  // const password = "ECT2016";
  // const authorization =
  //   "Basic " +
  //   Buffer.from(username + ":" + password, "utf-8").toString("base64");

  const authorization = "Basic RUNUYXJjZ2lzOkVDVDIwMTY=";

  const response = await axios.post(
    "https://homroteirizacao.correios.com.br/TMS.Services/TransportationTripService.svc/rest/InsertTripDetails",
    {
      ...planTripJson,
    },
    {
      headers: {
        Authorization: authorization,
      },
    }
  );

  return response.data;

  // return {
  //   Error: false,
  //   Item: 1234,
  //   Message: null,
  //   Warning: false,
  // };
};

module.exports = {
  dispatchJsonToCorreios,
};

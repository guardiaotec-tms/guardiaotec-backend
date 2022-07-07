const { default: axios } = require("axios");

const dispatchTrackJsonToCorreios = async (trackJson) => {
  const authorization = "Basic RUNUYXJjZ2lzOkVDVDIwMTY=";

  const response = await axios.post(
    // "https://homroteirizacao.correios.com.br/TMS.Tracking/TrackingServiceRest.svc/rest/InsertTrackingData",
    "https://roteirizacao.correios.com.br/TMS.Tracking/TrackingServiceRest.svc/rest/InsertTrackingData",
    trackJson,
    {
      headers: {
        Authorization: authorization,
      },
    }
  );

  if (response.data.success) {
    console.log("Ocorreu um erro na integração de rastreamento.");
    console.log(
      response.data.success,
      response.data.message,
      "placa: " + trackJson.placa
    );
  }

  return response.data;
};

module.exports = { dispatchTrackJsonToCorreios };

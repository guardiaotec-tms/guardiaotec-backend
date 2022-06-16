const { default: axios } = require("axios");

const dispatchTrackJsonToCorreios = async (trackJson) => {
  const authorization = "Basic RUNUYXJjZ2lzOkVDVDIwMTY=";

  const response = await axios.post(
    "https://homroteirizacao.correios.com.br/TMS.Tracking/TrackingServiceRest.svc/rest/InsertTrackingData",
    trackJson,
    {
      headers: {
        Authorization: authorization,
      },
    }
  );

  return response.data;
};

module.exports = { dispatchTrackJsonToCorreios };

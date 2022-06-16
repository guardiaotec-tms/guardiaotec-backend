const { default: axios } = require("axios");
var convert = require("xml-js");
const { obterEventosParser } = require("../service/obterEventosParser");
// const fs = require("fs");

const getLatestEvents = async () => {
  serviceName = "obterEventos";

  try {
    const res = await axios.get(
      "http://ws4.1gps.com.br/services/InterfaceExternaService/" + serviceName,
      {
        params: {
          id: "394",
          senha: "af3307f3042961c082564fb12b3e678c",
        },
      }
    );

    // console.log(res.data);

    const json = convert.xml2json(res.data, { compact: true, spaces: 2 });
    // console.log(json);
    //   fs.writeFileSync(serviceName + ".json", json);
    return obterEventosParser(json);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getLatestEvents,
};

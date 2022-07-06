const { default: axios } = require("axios");
var convert = require("xml-js");
const { obterEventosParser } = require("../service/obterEventosParser");
// const fs = require("fs");

const getLatestEvents = async () => {
  serviceName = "obterEventos";

  const multiportalMirroringSystemAuth = {
    id: "396",
    senha: "3346edb6a2c4d90d6200f5671b08163e",
  };

  try {
    const res = await axios.get(
      "http://ws4.1gps.com.br/services/InterfaceExternaService/" + serviceName,
      {
        params: {
          id: multiportalMirroringSystemAuth.id,
          senha: multiportalMirroringSystemAuth.senha,
        },
      }
    );

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

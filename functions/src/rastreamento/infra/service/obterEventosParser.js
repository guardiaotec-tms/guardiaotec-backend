// input: obterEventos response json
// output: parsed array of events
// const json = require("../../multiportal/obterEventos.json");

const { equipmentDateFormatter } = require("./equipmentDateFormatter");

const noData = (json) => {
  return (
    json["ns:obterEventosResponse"]["ns:return"]["ax215:mensagemRetorno"][
      "_text"
    ] === "NAO HA DADOS DISPONIVEIS PARA ESSA CONSULTA"
  );
};

const obterEventosParser = (json) => {
  json = JSON.parse(json);
  try {
    if (noData(json)) {
      console.log("No data");
      return [];
    }
    const events =
      json["ns:obterEventosResponse"]["ns:return"]["ax215:eventos"];

    // console.log(events.length);
    // console.log(json);
    // console.log(json["ns:obterEventosResponse"]);
    // console.log(events);
    const parsedEvents = [];
    for (const event of events) {
      let parsed = {};
      parsed.placa = event["ax215:placa"]["_text"];
      parsed.altitude = event["ax215:altitude"]["_text"];
      parsed.latitude = event["ax215:latitude"]["_text"];
      parsed.longitude = event["ax215:longitude"]["_text"];
      parsed.velocidade = event["ax215:velocidade"]["_text"];
      parsed.dataEquipamento = equipmentDateFormatter(
        event["ax215:dataEquipamento"]["_text"]
      );
      const components = event["ax215:componentes"];
      const compsObj = {};
      for (const comp of components) {
        const codigo = comp["ax215:codigo"]["_text"];
        const estado = comp["ax215:estado"]["_text"];
        compsObj[codigo] = estado;
      }
      parsed.componentes = compsObj;
      parsedEvents.push(parsed);
    }
    return parsedEvents;
  } catch (error) {
    console.log("line 40");
    console.log(error.message);

    throw error;
    // return [];
  }
};

module.exports = {
  obterEventosParser,
};

// console.log(obterEventosParser(json));

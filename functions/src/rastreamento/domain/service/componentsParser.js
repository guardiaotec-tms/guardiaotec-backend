// if component not found, return undefined
// const getComponentValue = (e, componentId) => {
//   let component = e["ax215:componentes"].find(
//     (c) => c["ax215:codigo"]["_text"] === componentId
//   );

//   if (component) {
//     let value = component["ax215:estado"]["_text"];
//     return value;
//   }
// };

const map = {
  inicaoLigada: "1",
  portaBauAberta: "6",
  portaPassageiroAberta: "9244",
  portaMotoristaAberta: "4",
};

// const getPortaMotoristaAberta = (e, previousTrackJson) => {
//   let portaMotoristaValue = getComponentValue(e, "4");

//   if (!portaMotoristaValue) return previousTrackJson["portaMotoristaAberta"];
//   return portaMotoristaValue === "1";
// };

// const getPortaPassageiroAberta = (e, previousTrackJson) => {
//   let portaPassageiroValue = getComponentValue(e, "9244");

//   if (!portaPassageiroValue) return previousTrackJson["portaPassageiroAberta"];
//   return portaPassageiroValue === "1";
// };

// const getPortaBauAberta = (e, previousTrackJson) => {
//   let portaBauValue = getComponentValue(e, "6");

//   if (!portaBauValue) return previousTrackJson["portaBauAberta"];
//   return portaBauValue === "1";
// };

// const getIgnicaoLigada = (e, previousTrackJson) => {
//   return e.componentes["1"] || previousTrackJson.ignicaoLigada;
// };

const getComponentValue = (e, previousTrackJson, name) => {
  return e.componentes[map[name]] || previousTrackJson[name];
};

const getCondutorData = (ed) => {
  let driver = ed.plannedTrip.plannedDrivers[0];
  let condutor = {
    nome: driver.name,
    telefone: ed.driverNumber,
    id_pessoal: driver.personalId,
  };
  return condutor;
};

module.exports = {
  // getPortaMotoristaAberta,
  // getIgnicaoLigada,
  // getPortaPassageiroAberta,
  // getPortaBauAberta,
  getComponentValue,
  getCondutorData,
};

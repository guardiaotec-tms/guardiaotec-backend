const { defaultPreviousTrackJson } = require("./defaultPreviousTrackJson");
const { getCondutorData, getComponentValue } = require("./componentsParser");

const makeTrackJson = (event, ed, previousTrackJson) => {
  const trackJson = {};

  if (!previousTrackJson) previousTrackJson = defaultPreviousTrackJson();

  const getValue = (compName) => {
    return getComponentValue(event, previousTrackJson, compName);
  };

  trackJson.numeroViagem = ed.planTripResponse.Item;
  trackJson.placa = event.placa;
  trackJson.empresa = ed.transportadora;
  trackJson.dataCoordenada = event.dataEquipamento;
  trackJson.longitude = event.longitude;
  trackJson.latitude = event.latitude;
  trackJson.velocidadeGPS = Number(event.velocidade);
  trackJson.velocidadeOdometro = Number(event.velocidade);
  trackJson.ignicaoLigada = getValue("ignicaoLigada");
  trackJson.portaMotoristaAberta = getValue("portaMotoristaAberta");
  trackJson.portaPassageiroAberta = getValue("portaPassageiroAberta");
  trackJson.portaBauAberta = getValue("portaBauAberta");
  trackJson.macro = 29;
  trackJson.veiculoParado = Number(event.velocidade) === 0;
  trackJson.condutor = getCondutorData(ed);

  return trackJson;
};

module.exports = {
  makeTrackJson,
};

// aqui a gente salva o trackJson no lugar do anterior
// previousTrackJson = trackJson;

/**
 
puxar latitude
puxar longitude
puxar ignicaoLigada


 */

/*
dados que virão da estrutura de dados:
- nome da transportadora

*/

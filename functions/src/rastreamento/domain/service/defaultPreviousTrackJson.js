const defaultPreviousTrackJson = () => {
  return {
    numeroViagem: "",
    placa: "",
    empresa: "",
    dataCoordenada: "",
    longitude: "",
    latitude: "",
    velocidadeGPS: "",
    velocidadeOdometro: "",
    ignicaoLigada: false,
    portaMotoristaAberta: false,
    portaPassageiroAberta: false,
    portaBauAberta: false,
    macro: 29,
    veiculoParado: true,
    condutor: {},
  };
};

module.exports = { defaultPreviousTrackJson };

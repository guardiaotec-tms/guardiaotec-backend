const {
  getDriverData,
  getVehicleData,
} = require("../../../shared/infra/repository");
const {
  getCurrentFormattedDate,
} = require("../../../shared/infra/service/getCurrentFormattedDate");
const { getGeoJson } = require("../../infra/service/getGeoJson");

const makePlantripJson = async (transpId, vinculo) => {
  const geoJson = await getGeoJson(transpId, vinculo);
  const driver = await getDriverData(transpId, vinculo.Motorista);
  const vehicle = await getVehicleData(transpId, vinculo["Veículo"]);
  const plantripJson = {
    geoJson,
    plannedDrivers: [
      {
        name: driver.nome,
        personalId: driver.cnh,
        functionalId: driver.cnh,
      },
    ],
    plannedVehicle: {
      licensePlate: vehicle.Placa,
      additionalLicensePlate: vehicle.Placa,
      model: vehicle.Modelo,
      weight: vehicle["Capacidade(m3)"],
    },
    workflow: { id: 29 },
    date: getCurrentFormattedDate(),
    idFicha: vinculo["Ficha Técnica"],
  };

  return { plantripJson, driverNumber: driver.contato };
};

module.exports = {
  makePlantripJson,
};

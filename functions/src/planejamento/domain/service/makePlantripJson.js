const {
  getDriverData,
  getVehicleData,
} = require("../../../shared/infra/repository");
const {
  getCurrentFormattedDate,
} = require("../../../shared/infra/service/getCurrentFormattedDate");
const { uploadError } = require("../../../shared/infra/service/uploadError");
const { getGeoJson } = require("../../infra/service/getGeoJson");

const getDriverObj = (driver) => {
  if (!driver) return;
  return {
    name: driver.nome,
    personalId: driver.cnh,
    functionalId: driver.cnh,
  };
};

const getPlannedDrivers = (driver, driver2) => {
  const obj1 = getDriverObj(driver);
  const obj2 = getDriverObj(driver2);
  const arr = [obj1];
  if (obj2) arr.push(obj2);
  return arr;
};

const makePlantripJson = async (transpId, vinculo) => {
  try {
    const geoJson = await getGeoJson(transpId, vinculo);

    // console.log(geoJson);
    // throw Error("quero cancelar!");
    const driver = await getDriverData(transpId, vinculo.Motorista);
    const driver2 = await getDriverData(transpId, vinculo["Motorista 2"]);
    const vehicle = await getVehicleData(transpId, vinculo["Veículo"]);
    const plantripJson = {
      geoJson,
      plannedDrivers: getPlannedDrivers(driver, driver2),
      plannedVehicle: {
        licensePlate: vehicle.Placa,
        additionalLicensePlate: vehicle.Placa,
        model: vehicle.Modelo,
        weight: vehicle["Capacidade(Kg)"],
      },
      workflow: { id: 29 },
      date: getCurrentFormattedDate(),
      idFicha: vinculo["Ficha Técnica"],
      integrador: "Guardião tec ",
    };
    return { plantripJson, driverNumber: driver.contato };
  } catch (error) {
    console.log("Erro!! Veículo: ", vinculo["Veículo"], error.message);
    uploadError({
      where: "makePlantripJson",
      message: "Erro!! Veículo: " + vinculo["Veículo"] + " " + error.message,
    });
    throw new Error(error.message);
  }
};

module.exports = {
  makePlantripJson,
};

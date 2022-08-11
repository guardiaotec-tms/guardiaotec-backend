const {
  findTripTimeRange,
} = require("../../../planejamento/domain/service/findTripTimeRange");
const { findVinculosFromFts } = require("../../../shared/infra/repository");
const { uploadFTPlateMap } = require("./uploadFTPlateMap");
const { uploadWatchedFTDoc } = require("./uploadWatchedFTDoc");

const getTripTimeRangeAsNumbers = async (vinculo, transpId) => {
  let { horarioInicio, horarioFim } = await findTripTimeRange(
    vinculo,
    transpId
  );
  horarioFim = horarioFim.getHours() + 1 - 3;
  if ([0, 1, 2].includes(horarioFim)) horarioFim = 23;
  horarioInicio = horarioInicio.getHours() - 3;
  return { horarioInicio, horarioFim };
};

const addToWatchedFTs = async (company, fts) => {
  let vinculos = await findVinculosFromFts(company.id, fts);

  const ftPlateMap = {};
  for (const ftn in vinculos) {
    const vinculo = vinculos[ftn];
    const { horarioFim, horarioInicio } = await getTripTimeRangeAsNumbers(
      vinculo,
      company.id
    );
    ftPlateMap[vinculo["Veículo"]] = ftn;
    console.log(vinculo["Veículo"], vinculo["Ficha Técnica"]);
    const watchedFTsDocData = {
      placa: vinculo["Veículo"],
      status: "active",
      coords: [],
      horarioFim,
      horarioInicio,
    };
    await uploadWatchedFTDoc(ftn, watchedFTsDocData);
  }
  // console.log("ftPlateMap", ftPlateMap, typeof ftPlateMap);
  await uploadFTPlateMap(ftPlateMap);
};

module.exports = { addToWatchedFTs };

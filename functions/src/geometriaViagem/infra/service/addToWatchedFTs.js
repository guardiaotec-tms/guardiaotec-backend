const { findVinculosFromFts } = require("../../../shared/infra/repository");

const addToWatchedFTs = async (company, fts) => {
  let vinculos = await findVinculosFromFts(company.id, fts);

  for (const ftn in vinculos) {
    const v = vinculos[ftn];
    console.log(v["Veículo"], v["Ficha Técnica"]);
    const watchedFTsDocData = {
      placa: v["Veículo"],
      status: "active",
      coords: "[]",
    };
    // await uploadWatchedFTDoc(ftn, watchedFTsDocData);
  }
  console.log(Object.entries(fts).length);
};

module.exports = { addToWatchedFTs };

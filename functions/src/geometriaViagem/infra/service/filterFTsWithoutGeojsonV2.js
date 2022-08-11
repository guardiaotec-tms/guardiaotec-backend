const { ftHasGeoJsonV2 } = require("./ftHasGeoJsonV2");

const filterFTsWithoutGeojsonV2 = async (company, fts) => {
  const withoutGeoJsonV2 = [];
  for (const ft of fts) {
    const ftn = ft["Nº da FT"];
    const has = await ftHasGeoJsonV2(company, ftn);
    if (has) console.log("continuing ftn: ", ftn);
    if (!has) withoutGeoJsonV2.push(ft);
  }
  console.log(
    `number of fts with geojsonV2 in ${company.Transportadora}: ${
      fts.length - withoutGeoJsonV2.length
    }`
  );
  return withoutGeoJsonV2;
};

module.exports = { filterFTsWithoutGeojsonV2 };

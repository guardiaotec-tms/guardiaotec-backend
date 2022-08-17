const coordsjson = require("./geojson.txt");
const fs = require("fs");
const { removeEquals } = require("./removeEquals");

const getCoords = (name) => {
  //   console.log(coordsJson);
  const coords = fs.readFileSync("./geojson/" + name).toString();
  return JSON.parse(JSON.parse(coords)).coordinates;
};

const func = (name) => {
  const geo = {
    type: "Feature",
    geometry: { type: "LineString", coordinates: [getCoords(name)] },
  };
  return geo;
};

const strjsonToOutput = (name) => {
  const geo = func(name);
  geo.geometry.coordinates = geo.geometry.coordinates[0].map((c) => [
    Number(c[0]),
    Number(c[1]),
  ]);

  //   console.log(geo.geometry.coordinates.length);
  //   geo.geometry.coordinates = removeEquals(geo.geometry.coordinates);
  //   console.log(geo.geometry.coordinates.length);

  // console.log(geo);
  fs.writeFileSync("./geojson/output" + name, JSON.stringify(geo));
};

strjsonToOutput("16765492.txt");

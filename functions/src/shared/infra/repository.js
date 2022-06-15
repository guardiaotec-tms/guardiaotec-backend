const { db } = require("./database/firebase");

const getDriverData = async (transpId, driverName) => {
  return db
    .collection("companies/" + transpId + "/drivers")
    .where("nome", "==", driverName)
    .get()
    .then((qs) => {
      return qs.docs[0].data();
    })
    .catch((error) => {
      console.log("Impossible to retrieve driver data.", error.message);
      console.log(transpId, driverName);
      console.log(error);
    });
};

const getVehicleData = async (transpId, plate) => {
  return db
    .collection("companies/" + transpId + "/vehicles")
    .where("Placa", "==", plate)
    .get()
    .then((qs) => {
      return qs.docs[0].data();
    })
    .catch((error) => {
      console.log("Impossible to retrieve vehicle data.", error.message);
      console.log(error);
    });
};

const getFts = async (transpId) => {
  const fts = [];
  await db
    .collection("companies/" + transpId + "/fts")
    .get()
    .then((qs) => {
      return qs.forEach((doc) => {
        fts.push(doc.data());
      });
    });
  return fts;
};

const getFT = async (vinculo, transpId) => {
  const ft = await db
    .collection("companies/" + transpId + "/fts")
    .where("Nº da FT", "==", vinculo["Ficha Técnica"])
    .get()
    .then((qs) => {
      return qs.docs[0];
    });

  return ft;
};

const getVinculos = async (transpId) => {
  const vinculos = [];
  const collection = await db
    .collection("companies/" + transpId + "/vinculos")
    .get();
  collection.forEach((doc) => {
    vinculos.push(doc.data());
  });
  return vinculos;
};

const findVinculosFromFts = async (transpId, fts) => {
  const vinculos = await getVinculos(transpId);
  const map = {};
  for (const ft of fts) {
    const vinculo = vinculos.find((v) => v["Ficha Técnica"] === ft["Nº da FT"]);
    if (vinculo) {
      map[ft["Nº da FT"]] = vinculo;
    }
  }
  return map;
};

const getCompanies = async () => {
  const companies = [];
  await db
    .collection("companies")
    .get()
    .then((qs) => {
      qs.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        companies.push(data);
      });
    });
  return companies;
};

module.exports = {
  getVehicleData,
  getDriverData,
  getFT,
  findVinculosFromFts,
  getCompanies,
  getFts,
  getVinculos,
};

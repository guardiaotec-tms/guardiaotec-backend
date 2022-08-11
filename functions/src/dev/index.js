process.NODE_ENV = "dev";
// const {
//   findCurrentActiveTrips,
// } = require("../rastreamento/domain/service/findCurrentActiveTrips");

const { db } = require("../shared/infra/database/firebase");

const main = async () => {
  //   console.log(await findCurrentActiveTrips());
  db.collection("companies")
    .get()
    .then((qs) => {
      qs.forEach((doc) => {
        console.log(doc.data());
      });
    });
};

main();

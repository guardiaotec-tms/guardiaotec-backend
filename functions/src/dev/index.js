process.NODE_ENV = "dev";
// const {
//   findCurrentActiveTrips,
// } = require("../rastreamento/domain/service/findCurrentActiveTrips");
const admin = require("firebase-admin");
const { firebaseConfig } = require("../shared/infra/database/firebaseConfig");
// const { firebaseConfig } = require("./firebaseConfig");

// const { db } = require("../shared/infra/database/firebase");

admin.initializeApp(firebaseConfig);
const db = admin.firestore();

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

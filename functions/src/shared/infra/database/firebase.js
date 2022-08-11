const admin = require("firebase-admin");
const { firebaseConfig } = require("./firebaseConfig");
const serviceAccount = require("../../../../../guardiaotec-tms-serviceaccount-key.json");

const env = process.NODE_ENV;

// console.log("env", env, firebaseConfig);

if (env === "dev") {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.initializeApp();
}

// const app = admin.initializeApp();
const db = admin.firestore();

module.exports = {
  db,
  auth: admin.auth,
};

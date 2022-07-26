const admin = require("firebase-admin");
const { firebaseConfig } = require("./firebaseConfig");

const env = process.NODE_ENV;

// console.log("env", env, firebaseConfig);

if (env === "dev") admin.initializeApp(firebaseConfig);
else admin.initializeApp();

// const app = admin.initializeApp();
const db = admin.firestore();

module.exports = {
  db,
  auth: admin.auth,
};

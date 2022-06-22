const admin = require("firebase-admin");
const app = admin.initializeApp();
const db = admin.firestore();

module.exports = {
  db,
  auth: admin.auth,
};

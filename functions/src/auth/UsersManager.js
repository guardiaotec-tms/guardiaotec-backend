const { auth } = require("firebase-admin");
const { db } = require("../shared/infra/database/firebase");
const { setCorsHeaders } = require("../shared/utils/setCorsHeaders");

class UsersManager {
  constructor() {}

  async deleteUser(req, res) {
    try {
      const body = JSON.parse(req.body);
      const userId = body.userId;
      console.log(req.body);
      console.log(req.body.userId);
      console.log(userId);
      await auth()
        .deleteUser(userId)
        .then(() => {
          //   console.log();
          return "Successfully deleted user";
        });

      res.json({ msg: "Successfully deleted user", success: true });
    } catch (error) {
      console.log(error);
      res.json({ msg: "Error: " + error.message, success: false });
    }
  }

  async isBlockedUser(req, res) {
    setCorsHeaders(res);
    try {
      // const body = JSON.parse(req.body);
      const body = req.body;
      const email = body.email;
      console.log(email);
      const isBlocked = await db
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((qs) => {
          return qs.size > 0 && qs.docs[0].data().blocked;
        });
      res.json({ isBlocked });
    } catch (error) {
      console.log(error);
      res.json({ errorMsg: error.message });
    }
  }
}

module.exports = {
  UsersManager,
};

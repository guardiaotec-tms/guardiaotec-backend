const { auth } = require("firebase-admin");

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
}

module.exports = {
  UsersManager,
};

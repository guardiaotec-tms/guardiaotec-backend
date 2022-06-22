const { auth } = require("firebase-admin");

class UsersManager {
  constructor() {}

  async deleteUser(req, res) {
    try {
      const userId = req.body.userId;
      await auth()
        .deleteUser(userId)
        .then(() => {
          //   console.log();
          return "Successfully deleted user";
        });

      res.json({ msg: "Successfully deleted user", success: true });
    } catch (error) {
      res.json({ msg: "Error: " + error.message, success: false });
    }
  }
}

module.exports = {
  UsersManager,
};

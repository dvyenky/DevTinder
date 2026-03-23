const express = require("express");
const { User_Auth } = require("../Middlewares/UserAuth");
const { Validate_Data } = require("../Utils/ValidateData");

const profileAuth = express.Router();

profileAuth.get("/profile/view", User_Auth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send("Something wents wrong : ", err.message);
  }
});

profileAuth.patch("/profile/edit", User_Auth, async (req, res) => {
  try {
    const is_allowed = Validate_Data(req);
    if (!is_allowed) {
      throw new Error("Invalid Request");
    }
    const loggedin_user = req.user;
    Object.keys(req.body).forEach(
      (key) => (loggedin_user[key] = req.body[key]),
    );
    await loggedin_user.save();
    res
      .status(200)
      .send(`${loggedin_user.firstName} Your Profile Update Successfully`);
  } catch {
    res.status(400).send("Something wents wrong : ", err.message);
  }
});

module.exports = {
  profileAuth,
};

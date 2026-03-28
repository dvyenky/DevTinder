const express = require("express");
const bcrypt = require("bcrypt");
const user = require("../Models/user");
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

profileAuth.patch("/profile/password", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please Provide Credential");
    }
    const user_data = await user.findOne({ email: email });
    if (!user_data) {
      throw new Error("User Not Found");
    }

    const password_hash = await bcrypt.hash(password, 10);
    const updated_data = await user.findOneAndUpdate(
      {
        email,
      },
      { password: password_hash },
      { returnDocument: true },
    );
    res
      .status(200)
      .json({ message: "Password Updated Successfully ", data: updated_data });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something wents Wrong : ", error: err.message });
  }
});

module.exports = {
  profileAuth,
};

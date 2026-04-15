const express = require("express");
const bcrypt = require("bcrypt");
const user = require("../Models/user");

const authRouter = express.Router();

authRouter.post("/signUp", async (req, res) => {
  try {
    const { firstName, lastName, email, password, city, age, gender } =
      req.body;
    if (!firstName || !lastName || !email || !password || !age || !gender) {
      throw new Error("Please Fill The Required Details");
    }
    const password_hash = await bcrypt.hash(password, 10);
    await user.insertOne({
      firstName,
      lastName,
      email,
      password: password_hash,
      city,
      age,
      gender,
    });
    res.status(201).send("User Created Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something wents wrong : ", err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide the credential");
    }

    const user_data = await user.findOne({ email: email });

    if (!user_data) {
      throw new Error("User Not Found, Please Create a Account");
    }
    const data = await user_data.validatePassword(password);
    if (!data) {
      throw new Error("Password is incorrect");
    }
    const token = await user_data.getJWTToken();
    res.cookie("token", token);
    res.status(200).send("User Login SuccessFully");
  } catch (err) {
    res.status(400).json("Something wents wrong : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { maxAge: 0, secure: true, httpOnly: true });
    res.status(200).send({ message: "LogOut SuccessFully !!!" });
  } catch (error) {
    res.status(400).send("Something wents wrong : ", error.message);
  }
});

module.exports = { authRouter };

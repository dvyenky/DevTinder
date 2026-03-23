const jwt = require("jsonwebtoken");
const user = require("../Models/user");

const User_Auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please Login");
    }
    const decoded_obj = await jwt.verify(token, "Devtinder@786");
    const { _id } = decoded_obj;
    const user_data = await user.findById({ _id });
    if (!user_data) {
      throw new Error("User Not Found ");
    }
    req.user = user_data;
    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

module.exports = {
  User_Auth,
};

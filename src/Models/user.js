const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address : " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password : " + value);
        }
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ["male", "female", "transgender"],
        message: "Please Enter the proper gender",
      },
      lowercase: true,
    },
    city: {
      type: String,
      uppercase: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkVvMCBnphQK8uOXgBPdJ0fzq8WtSBWcKeIw&s",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWTToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Devtinder@786", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (inputByUser) {
  const user = this;
  const data = await bcrypt.compare(inputByUser, user.password);
  return data;
};
const User = mongoose.model("user", userSchema);

module.exports = User;
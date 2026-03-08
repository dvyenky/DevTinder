const express = require("express");
const mongodb = require("./src/Database");

const port = 7777;

const app = express();

app.get("/adminData", (req, res, next) => {
  const token = "xyz";
  const token_verification = token === "xyz";
  if (!token_verification) {
    return next(new Error("You are Not Authorized"));
  }
  res.send("Your admin data");
});

app.get("/userData", (req, res, next) => {
  const token = "xyza";
  const token_verification = token === "xyz";
  if (!token_verification) {
    return next(new Error("You are Not Authorized"));
  }
  res.send({
    name: "XYZ",
    city: "Pune",
  });
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log("Server is listening on ", port);
});

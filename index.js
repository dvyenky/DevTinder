const express = require("express");
const port = 7777;

const app = express();

app.get("/user/:userId", (req, res) => {
  const req_id = req.params.userId;
  res.send(`your userid =>  ${req_id}`);
});

app.get("/getUserDetails", (req, res) => {
  const city = req.query.city;
  const name = req.query.name;
  res.send(`The ${name} is belong to ${city}`);
});

app.listen(port, () => {
  console.log("Server is listening on ", port);
});

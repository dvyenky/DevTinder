const express = require("express");
const port = 7777;

const app = express();

app.use("/test", (req, res) => {
  res.json("Hello From test EndPoint");
});

app.use("/hello", (req, res) => {
  res.json("Hello From hello EndPoint");
});

app.use("/getDetails", (req, res) => {
  res.json({
    name: "vyenkatesh",
    city: "pune",
  });
});

app.listen(port, () => {
  console.log("Server is listening on ", port);
});

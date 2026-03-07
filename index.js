const express = require("express");
const port = 7777;

const app = express();

app.use("/test", (req, res) => {
  res.json("Hello From test EndPoint");
});

app.use("/hello/abc", (req, res) => {
  res.send("Hello World from Another hello Routing");
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

app.get("/user/:id", (req, res) => {
  console.log(req.params);
  res.send("User fetch the data : ", req.params);
});


app.get("/user", (req, res) => {
  res.send("Fetch the User Data Successfully");
});

app.post("/user", (req, res) => {
  res.send("Save the User Successfully");
});

app.use("/", (req, res) => {
  res.send("Hello Server");
});

app.listen(port, () => {
  console.log("Server is listening on ", port);
});

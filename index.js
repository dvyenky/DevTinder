const express = require("express");
const cookie = require("cookie-parser");

const connect_db = require("./src/Database");
const { authRouter } = require("./src/Routers/UserAuth");
const { profileAuth } = require("./src/Routers/ProfileAuth");

const port = 7777;

const app = express();

app.use(express.json());
app.use(cookie());

app.use("/", authRouter);
app.use("/", profileAuth);

connect_db()
  .then(() => {
    console.log("Connected to Database");
    app.listen(port, () => {
      console.log("Server is listening on ", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

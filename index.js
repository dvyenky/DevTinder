const express = require("express");
const user = require("./src/Models/user");
const connect_db = require("./src/Database");

const port = 7777;

const app = express();

app.use(express.json());

app.post("/signUp", async (req, res) => {
  const data = req.body;
  try {
    await user.insertOne(data);
    res.status(201).send("User Created Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something wents wrong : ", err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const user_data = await user.find();
    if (user_data.length === 0) {
      res.status(404).send("User Details Not Found");
    }
    res.status(200).send(user_data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/user/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    const single_user = await user.findById(user_id);
    if (single_user.length === 0) {
      res.status(404).send("No User Found");
    }
    res.status(200).send(single_user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/singleuser", async (req, res) => {
  const user_email = req.query.email;
  try {
    const user_details = await user.find({ email: user_email });
    if (user_details.length === 0) {
      res.status(404).send("No User Found");
    } else {
      res.status(200).send(user_details);
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/deleteUser", async (req, res) => {
  const user_email = req.body.email;
  console.log(user_email);
  try {
    const user_details = await user.deleteOne({ email: user_email });
    if (user_details.length === 0) {
      res.status(404).send("No User Found with emailId");
    } else {
      res.status(200).send(user_details);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something wents wrong");
  }
});

app.patch("/userUpdate", async (req, res) => {
  const user_password = req.body.password;
  try {
    const user_details = await user.findOneAndUpdate(
      { firstName: "vyenkatesh" },
      { $set: { password: user_password } },
      { new: true },
    );
    if (user_details.length === 0) {
      res.status(404).send("User Not Updated");
    } else {
      res.status(200).send(user_details);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something wents wrong");
  }
});

app.patch("/updateUserByEmailId", async (req, res) => {
  try {
    const user_email = req.body.email;
    const city = req.body.city;
    const user_details = await user.findOneAndUpdate(
      { email: user_email },
      {
        $set: {
          city: city,
        },
      },
      { returnDocument: "after" },
    );
    if (user_details.length === 0) {
      res.status(404).send("User Not Updated");
    } else {
      res.status(200).send(user_details);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something wents wrong");
  }
});

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

const mongoose = require("mongoose");

const connect_db = async () => {
  await mongoose.connect(
    "mongodb+srv://dvyenkatesh:2lkDhHaKnEM0mTVc@devtinder.vyim35o.mongodb.net/devtinder",
  );
};

module.exports = { connect_db };


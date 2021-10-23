const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI"); // gets mongoURI from default.json, which gets this connection string from mongodb to allow us to connect to the database

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

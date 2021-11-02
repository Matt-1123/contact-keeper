// This model will be used in the contacts route.

// Note on models: When dealing with database resources, you need to have a model for each resource. In this case we are creating a model with mongoose.

const mongoose = require("mongoose");

// Note: Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const ContactSchema = mongoose.Schema({
  // ref refers to specific collection in database
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "personal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contact", ContactSchema);

const mongoose = require("mongoose");

const drugsSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
  },
  openingDate: {
    type: Date,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number,
  },
  phone_number: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("drugs", drugsSchema);

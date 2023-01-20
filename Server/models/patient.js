const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true,
  },
  cardType: {
    type: String,
  },
  phone_number: Number,
  family: {
    person1: {
      firstname: String,
      relation: String,
    },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("patient", patientSchema);

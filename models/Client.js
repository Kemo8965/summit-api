const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  lastName: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  title: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  dateOfBirth: {
    type: Date,
    required: true,
   
  },
  gender: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  maritalStatus: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  idNumber: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  idType: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  phoneNumber: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  residentialAddress: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
});

module.exports = mongoose.model("Clients", ClientSchema);

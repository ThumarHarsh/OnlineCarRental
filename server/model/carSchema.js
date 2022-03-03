const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  carmodel: {
    type: String,
    required: true,
  },
  carclass: {
    type: String,
    required: true,
  },
  transmissiontype: {
    type: String,
    required: true,
  },
  seatingcapacity: {
    type: Number,
    required: true,
  },
  fueltype: {
    type: String,
    required: true,
  },
  carnumber: {
    type: String,
    required: true,
  },
  priceperday: {
    type: Number,
    required: true,
  },
  isbooked: {
    type: Boolean,
    default: false,
  },
  carpic: {
    type: String,
  },
});

const Car = mongoose.model("CAR", carSchema);
module.exports = Car;

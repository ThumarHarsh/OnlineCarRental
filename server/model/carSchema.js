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
        type: String,
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
        type: String,
        required: true,
    },
    isbooked: {
        type: Boolean,
        default: false,
    }
})


const Car = mongoose.model("CAR", carSchema);
module.exports = Car;
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    carid: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    totalamount: {
        type: String,
        required: true,
    },
    startdate: {
        type: Date,
        required: true,
    },
    enddate: {
        type: Date,
        required: true,
    }
})

const Book = mongoose.model("BOOK", bookingSchema);
model.exports = Book;
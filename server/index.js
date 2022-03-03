const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const port = 7000;
mongoose
  .connect("mongodb://localhost:27017/onlinecarrental")
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static("public"));
// const User = require("./model/userSchema");
app.use(require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("Hello world from the server");
});
app.get("/about", (req, res) => {
  res.send("Hello world from the about page");
});
app.listen(port, "localhost", () => {
  console.log("Server is running on PORT " + port);
});

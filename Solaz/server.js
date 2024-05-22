let express = require("express");
let mongoose = require("mongoose");
let server = express();

const roomSchema = new mongoose.Schema({
  name: String,
  roomnumber: Number,
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
server.get("/", (req, res) => {
  res.render("index");
});
mongoose.connect("mongodb://localhost:27017/").then(() => {
  console.log("Connected to MongoDB");
});

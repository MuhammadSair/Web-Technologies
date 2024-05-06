//npm i express
//run it from same folder in which you are building your server
// npm i -g nodemon
//run above command once in lifetime.
const express = require("express");
let server = express();
server.use(express.static("public"));
server.set("view engine", "ejs");
//above line sets ejs as view engine
server.get("/Earth", function (req, res) {
  //route to handle / get request
  res.render("earth");
});
const path = require('path');

server.get("/", function (req, res) {
    res.render("index");
});
server.get("/", function (req, res) {
    res.render("index");
});
server.listen(4000);

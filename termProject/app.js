// require("dotenv").config();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const app = express();
const appLocals = require("./config/app-locals");

app.locals = appLocals;
console.log("mongodb connected with url", process.env.URI);
console.log("session secret", process.env.SESSION_SECRET);
// mongoose.connect(process.env.URI);
// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/shoeStore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
);
app.use(methodOverride("_method"));

app.use(require("./routes/default"));
app.use("/admin", require("./routes/admin"));
app.use("/hr", require("./routes/hr"));
app.use("/employee", require("./routes/employee"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

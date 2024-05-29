require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const app = express();
const appLocals = require("./config/app-locals");

app.locals = appLocals;
console.log(process.env.URI);
mongoose.connect(process.env.URI);
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

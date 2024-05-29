let express = require("express");
let mongoose = require("mongoose");
let ejslayouts = require("express-ejs-layouts");
const staticRoute = require("./routes/staticRouter");
let app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(ejslayouts);
app.set("layout", "layout");
app.use(express.static("public"));
let path = require("path");

app.use(express.static(path.join(__dirname, "public")));
const roomSchema = new mongoose.Schema({
  name: String,
  roomnumber: Number,
});

app.use("/uploads", express.static(path.join(__dirname, "/assets")));
app.use("/", staticRoute);
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
app.get("/", (req, res) => {
  res.render("index.ejs");
});
console.log(process.env.MONGO_URI);
mongoose
  .connect(
    "mongodb+srv://msair565:o5lMisT8yJg7dajE@cluster0.slckpbf.mongodb.net/rooms?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

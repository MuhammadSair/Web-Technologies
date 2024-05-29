const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { css: "index.css" });
});
router.get("/rooms", (req, res) => {
  res.render("rooms", { css: "rooms.css" });
});
app.get("/reservation/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  // Fetch room details from MongoDB using roomId
  // Render the reservation page with room details
});
module.exports = router;

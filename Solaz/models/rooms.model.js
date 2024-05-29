const room = new Room({
  name: "Single Room",
  price: 40,
  // Add more fields as needed
});

room.save((err, room) => {
  if (err) return console.error(err);
  console.log("Room saved:", room);
});

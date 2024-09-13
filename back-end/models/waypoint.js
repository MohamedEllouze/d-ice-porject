const mongoose = require("mongoose");

const waypointSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
});

const Route = mongoose.model("Waypoint", waypointSchema);

module.exports = Route;

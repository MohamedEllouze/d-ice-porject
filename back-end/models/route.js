const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routeSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  waypoints: [{ type: Schema.Types.ObjectId, ref: "Waypoint" }],
});

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;

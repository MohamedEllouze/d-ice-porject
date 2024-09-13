const express = require("express");
const router = express.Router();
const Waypoint = require("../models/waypoint");
const mongoose = require("mongoose");

// CREATE - Ajouter une Waypoint
router.post("/", async (req, res) => {
  try {
    const waypointData = req.body;
    delete waypointData.id;
    const waypoint = new Waypoint({
      id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    });
    await waypoint.save();
    res.status(201).send(waypoint);
  } catch (error) {
    res.status(400).send(error.message || error);
  }
});

// READ - Récupérer toutes les waypoints
router.get("/", async (req, res) => {
  try {
    const waypoints = await Waypoint.find();
    res.status(200).send(waypoints);
  } catch (error) {
    res.status(500).send(error);
  }
});

// READ - Récupérer une waypoint par ID
router.get("/:id", async (req, res) => {
  try {
    const waypoint = await Waypoint.findById(req.params.id);
    if (!waypoint) {
      return res.status(404).send();
    }
    res.status(200).send(waypoint);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE - Mettre à jour une waypoint
router.patch("/:id", async (req, res) => {
  try {
    const waypoint = await Waypoint.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!waypoint) {
      return res.status(404).send();
    }
    res.status(200).send(waypoint);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE - Supprimer une waypoint
router.delete("/:id", async (req, res) => {
  try {
    const waypoint = await Waypoint.findByIdAndDelete(req.params.id);
    if (!waypoint) {
      return res.status(404).send();
    }
    res.status(200).send(waypoint);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

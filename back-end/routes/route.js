const express = require("express");
const router = express.Router();
const Route = require("../models/route");
const { default: mongoose } = require("mongoose");

// CREATE - Ajouter une route
router.post("/", async (req, res) => {
  try {
    const route = new Route({
      id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      waypoints: req.body.waypoints,
    });
    await route.save();
    res.status(201).send(route);
  } catch (error) {
    res.status(400).send(error);
  }
});

// READ - Récupérer toutes les routes
router.get("/", async (req, res) => {
  try {
    const routes = await Route.find().populate("waypoints"); // Populate waypoints to get full waypoint details
    res.status(200).send(routes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// READ - Récupérer une route par ID
router.get("/:id", async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate("waypoints");
    if (!route) {
      return res.status(404).send();
    }
    res.status(200).send(route);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE - Mettre à jour une route
router.patch("/:id", async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("waypoints"); // Populate waypoints after the update
    if (!route) {
      return res.status(404).send();
    }
    res.status(200).send(route);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE - Supprimer une route
router.delete("/:id", async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) {
      return res.status(404).send();
    }
    res.status(200).send(route);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

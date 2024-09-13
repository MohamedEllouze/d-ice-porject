const express = require("express");
const mongoose = require("mongoose");
const routeRoutes = require("./routes/route");
const routeWaypoints = require("./routes/waypoint");

const cors = require("cors");

const app = express();
const port = 5000;
// Use CORS middleware
app.use(cors());

// Alternatively, configure CORS with specific options:
app.use(
  cors({
    origin: "http://localhost:3000", // Replace this with your frontend's domain (e.g., React app)
    methods: "GET,POST,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
// Middleware pour analyser les requêtes JSON
app.use(express.json());

const { ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://mohamedellouze21:xx4d23H2GNdO5B6C@cluster0.gzxzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })
  .then(() => {
    console.log("Successfully connected to MongoDB with Mongoose!");
  })
  .catch((error) => {
    console.error("Connection error", error);
  });

// Routes utilisateurs
app.use("/routes", routeRoutes);
app.use("/waypoints", routeWaypoints);

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

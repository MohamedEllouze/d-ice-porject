import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import RoutesList from "./routesList/RoutesList.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoutePage from "./routesList/routePage/RoutePage.tsx";
import { Grid2 } from "@mui/material";
import { useRoute } from "./hooks/route.query.ts";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9oYW1lZGVsbG91emUiLCJhIjoiY20wemJkcnN2MDM2cjJyc2NrZXlxdXNwcCJ9.xfNVM1AY_W7Sh38ZcouOqA";

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const {
    data: routeById,
    isLoading,
    isError,
    isFetched,
    refetch: routeByIdRefetch,
  } = useRoute(selectedRouteId);

  useEffect(() => {
    // When the map first loads, center it at the initial coordinates
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    console.log(routeById);

    if (!isFetched || !routeById || !map.current) return;

    // Set map center based on the first waypoint's longitude and latitude
    const firstWaypoint = routeById.waypoints[0];
    if (firstWaypoint) {
      map.current.setCenter([firstWaypoint.longitude, firstWaypoint.latitude]);
      map.current.setZoom(10); // Set an appropriate zoom level for waypoints
    }

    // Clear previous markers if any
    const markers = [];

    // Add waypoints to the map as markers
    routeById.waypoints.forEach((waypoint) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([waypoint.longitude, waypoint.latitude])
        .addTo(map.current);

      markers.push(marker);
    });

    // Add a line between the waypoints if there are multiple
    if (routeById.waypoints.length > 1) {
      const routeCoordinates = routeById.waypoints.map((waypoint) => [
        waypoint.longitude,
        waypoint.latitude,
      ]);

      const routeGeoJSON = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: routeCoordinates,
        },
      };

      if (map.current.getSource("route")) {
        map.current.getSource("route").setData(routeGeoJSON);
      } else {
        map.current.addSource("route", {
          type: "geojson",
          data: routeGeoJSON,
        });

        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 6,
          },
        });
      }

      // Fit the map to the bounds of the route
      const bounds = new mapboxgl.LngLatBounds();
      routeCoordinates.forEach((coord) => bounds.extend(coord));
      map.current.fitBounds(bounds, { padding: 50 });
    }

    // Clean up markers on component unmount
    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [isFetched, routeById]);
  console.log(routeById);
  useEffect(() => {
    if (selectedRouteId) routeByIdRefetch();
  }, [selectedRouteId]);
  return (
    <div className="App">
      <div ref={mapContainer} className="map-container" />
      <Grid2
        className="routes-container"
        style={{ backgroundColor: "#152534" }}
      >
        <Router>
          <Routes>
            <Route
              path={"/"}
              element={<RoutesList setSelectedRouteId={setSelectedRouteId} />}
            />
            <Route path="/route-page/:routeId" element={<RoutePage />} />
          </Routes>
        </Router>
      </Grid2>
    </div>
  );
}

export default App;

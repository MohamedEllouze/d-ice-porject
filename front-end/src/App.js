import React, { useRef, useEffect, useState, createContext } from "react";
import "./App.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import RoutesList from "./components/routeList/RoutesList.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoutePage from "./components/routePage/RoutePage.tsx";
import { Grid2 } from "@mui/material";
import { useRoute } from "./hooks/route.query.ts";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9oYW1lZGVsbG91emUiLCJhIjoiY20wemJkcnN2MDM2cjJyc2NrZXlxdXNwcCJ9.xfNVM1AY_W7Sh38ZcouOqA";

export const MyContext = createContext();

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [waypointsList, setWaypointsList] = useState([]);

  const {
    data: routeById,
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
    if (!map.current || !waypointsList.length) return; // Ensure map is initialized and there are waypoints

    // Clear previous markers and layers if any
    map.current.getSource("route") && map.current.removeLayer("route");
    map.current.getSource("route") && map.current.removeSource("route");

    // Store markers to remove them later
    const markers = [];

    // Add waypoints as draggable markers
    waypointsList.forEach((waypoint, index) => {
      const marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([waypoint.longitude, waypoint.latitude])
        .addTo(map.current)
        .on("dragend", (event) => {
          const newLngLat = event.target.getLngLat();
          updateWaypointPosition(index, newLngLat); // Function to update waypoint in state
        });

      markers.push(marker);
    });

    // Create a GeoJSON object for the route (polyline)
    const routeGeoJSON = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: waypointsList.map((wp) => [wp.longitude, wp.latitude]),
      },
    };

    // Add the route (polyline) to the map
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

    // Fit the map to the route's bounds
    const bounds = new mapboxgl.LngLatBounds();
    waypointsList.forEach((waypoint) => {
      bounds.extend([waypoint.longitude, waypoint.latitude]);
    });
    map.current.fitBounds(bounds, { padding: 50 });

    // Clean up markers when component unmounts
    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [waypointsList]);

  // Function to update waypoint position in state when marker is dragged
  const updateWaypointPosition = (index, { lng, lat }) => {
    const updatedWaypoints = [...waypointsList];
    updatedWaypoints[index] = {
      ...updatedWaypoints[index],
      longitude: lng,
      latitude: lat,
    };
    setWaypointsList(updatedWaypoints);
  };

  useEffect(() => {
    if (selectedRouteId) routeByIdRefetch();
  }, [selectedRouteId]);

  useEffect(() => {
    if (routeById) {
      setWaypointsList(routeById?.waypoints);
      setLng(routeById?.waypoints[0].longitude);
      setLat(routeById?.waypoints[0].latitude);
    }
  }, [isFetched, routeById]);
  return (
    <MyContext.Provider
      value={{
        waypointsList,
        setWaypointsList,
        updateWaypointPosition,
        selectedRouteId,
        setSelectedRouteId,
      }}
    >
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
    </MyContext.Provider>
  );
}

export default App;

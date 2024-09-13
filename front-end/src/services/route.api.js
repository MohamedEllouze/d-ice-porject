import axios from "axios";

const API_URL = "http://localhost:5000/routes";

// Get all routes
export const getRoutes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Find route by ID
export const getRouteById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new route
export const createRoute = async (routeData) => {
  const response = await axios.post(API_URL, routeData);
  return response.data;
};

// Update an existing route
export const updateRoute = async (id, updatedRoute) => {
  const response = await axios.patch(`${API_URL}/${id}`, updatedRoute);
  return response.data;
};

// Delete an existing route
export const deleteRoute = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

import axios from "axios";

const API_URL = "http://localhost:5000/waypoints";

export const getWaypoints = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getWaypointById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createWaypoint = async (waypointData) => {
  const response = await axios.post(API_URL, waypointData);
  return response.data;
};

export const deleteWaypoint = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateWaypoint = async (id, updatedWaypoint) => {
  const response = await axios.patch(`${API_URL}/${id}`, updatedWaypoint);
  return response.data;
};

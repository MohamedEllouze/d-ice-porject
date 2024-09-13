import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getWaypoints,
  createWaypoint,
  deleteWaypoint,
  updateWaypoint,
} from "../services/waypoint.api";

// Fetch all waypoints
export const useWaypoints = () =>
  useQuery("waypoints", getWaypoints, { enabled: true });

// Create a new waypoint
export const useCreateWaypoint = () =>
  useMutation({
    mutationFn: createWaypoint, // Function to perform the creation
    onSuccess: (data) => {
      console.log("Data posted successfully:", data);
    },
    onError: (error) => {
      console.error("Error posting data:", error);
    },
  });

// Delete a waypoint
export const useDeleteWaypoint = () =>
  useMutation({
    mutationFn: deleteWaypoint, // Function to perform the delete
    onSuccess: (data) => {
      console.log("Waypoint deleted successfully:", data);
    },
    onError: (error) => {
      console.error("Error deleting waypoint:", error);
    },
  });

// Update an existing waypoint
export const useUpdateWaypoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updatedWaypoint }: any) =>
      updateWaypoint(id, updatedWaypoint),
    onSuccess: () => {
      // Invalidate and refetch routes after updating a route
      queryClient.invalidateQueries("waypoints");
    },
  });
};

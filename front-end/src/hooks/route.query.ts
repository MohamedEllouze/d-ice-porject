import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
} from "../services/route.api";

// Fetch all routes
export const useRoutes = () => {
  return useQuery("routes", getRoutes);
};

// Fetch a single route by ID
export const useRoute = (id) => {
  return useQuery(["route", id], () => getRouteById(id), {
    enabled: false, // Only run the query if `id` is defined
  });
};

// Create a new route
export const useCreateRoute = () => {
  const queryClient = useQueryClient();

  return useMutation(createRoute, {
    onSuccess: () => {
      // Invalidate and refetch routes after creating a new one
      queryClient.invalidateQueries("routes");
    },
  });
};

// Update an existing route
export const useUpdateRoute = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, updatedRoute }: any) => updateRoute(id, updatedRoute),
    {
      onSuccess: () => {
        // Invalidate and refetch routes after updating a route
        queryClient.invalidateQueries("routes");
      },
    }
  );
};

// Delete a route
export const useDeleteRoute = () =>
  useMutation({
    mutationFn: deleteRoute, // Function to perform the delete
    onSuccess: (data) => {
      console.log("Route deleted successfully:", data);
    },
    onError: (error) => {
      console.error("Error deleting route:", error);
    },
  });

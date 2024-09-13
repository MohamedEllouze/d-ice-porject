import React, { ChangeEvent, useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  useCreateWaypoint,
  useDeleteWaypoint,
  useWaypoints,
  useUpdateWaypoint,
} from "../../hooks/waypoint.query.ts";
import { IWaypoint } from "../../interfaces/waypoint.interface.ts";
import {
  useCreateRoute,
  useRoute,
  useUpdateRoute,
} from "../../hooks/route.query.ts";

export default function AddRoutePage() {
  let { routeId } = useParams();
  const { data, isFetched, refetch: refetchWaypointList } = useWaypoints();
  const {
    mutate: createWaypoint,
    isSuccess: createWaypointSuccess,
    isError: createWaypointError,
  } = useCreateWaypoint();
  const { mutate: deleteWaypoint } = useDeleteWaypoint();
  const { mutate: updateWaypoint } = useUpdateWaypoint();
  const {
    mutate: createRoute,
    isLoading: createRouteLoading,
    isError: createRouteError,
    isSuccess: createRouteSuccess,
  } = useCreateRoute();
  const {
    data: routeById,
    isFetched: routeByIdFetched,
    refetch: refetchRouteById,
    isSuccess: routeByIdIsSuccess,
  } = useRoute(routeId);
  const {
    mutate: updateRoute,
    isLoading: updateRouteLoading,
    isError: updateRouteError,
    isSuccess: updateRouteSuccess,
  } = useUpdateRoute();

  const [waypoint, setWaypoint] = useState<IWaypoint>({
    name: "",
    latitude: 0,
    longitude: 0,
  });
  const [waypointsList, setWaypointsList] = useState<IWaypoint[]>([]);

  const navigate = useNavigate();

  // Add route function
  const addRoute = () => {
    createRoute({
      name: routeId,
      waypoints: waypointsList.map((el) => el._id),
    });
  };

  // Edit route function
  const editRoute = () => {
    updateRoute({
      id: routeId,
      updatedRoute: {
        name: routeById.name,
        waypoints: waypointsList.map((el) => el._id),
      },
    });
  };

  // Handle edit waypoints input change
  const changeWaypoints = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedWaypoints = [...waypointsList];
    updatedWaypoints[index] = {
      ...updatedWaypoints[index],
      [e.target.name]: e.target.value,
    };
    setWaypointsList(updatedWaypoints);
  };

  // Handle waypoint input change
  const changeWaypoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaypoint({
      ...waypoint,
      [e.target.name]: e.target.value,
    });
  };

  // Add a new waypoint with automatically generated name
  const addWaypoint = () => {
    createWaypoint(waypoint, {
      onSuccess: (createdWaypoint) => {
        setWaypointsList((prev) => [...prev, createdWaypoint]); // Add new waypoint to list
      },
    });
  };

  // Remove waypoint
  const removeWaypoint = async (id: string | undefined) => {
    deleteWaypoint(id, {
      onSuccess: () => refetchWaypointList(), // Refetch waypoints after deleting
    });
  };

  // Update waypoint
  const updateWaypointData = (
    waypointId: string | undefined,
    updatedWaypoint: Partial<IWaypoint>
  ) => {
    updateWaypoint(
      { id: waypointId, updatedWaypoint },
      {
        onSuccess: () => refetchWaypointList(), // Refetch waypoints after updating
      }
    );
  };

  useEffect(() => {
    if (routeByIdIsSuccess) {
      setWaypointsList(routeById?.waypoints);
    }
  }, [routeByIdFetched]);

  useEffect(() => {
    if (routeId) {
      refetchRouteById();
    }
  }, [routeId]);

  const returnFunction = () => {
    navigate(-1);
    setWaypointsList([]);
    setWaypoint({
      name: "",
      latitude: 0,
      longitude: 0,
    });
  };
  return (
    <Grid2 container>
      <Grid2 style={{ display: "flex", alignItems: "center" }}>
        <ChevronLeftIcon onClick={returnFunction} />
        <Typography variant="h3">RoutePage</Typography>
      </Grid2>

      <Grid2>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 250, backgroundColor: "#152534" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="right">
                  <Typography variant="body1">Step</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">Latitude</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">Longitude</Typography>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {waypointsList.map((row, index) => (
                <TableRow
                  key={row._id || index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    <Typography variant="body1">{row.name}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      variant="outlined"
                      size="small"
                      name="latitude"
                      onChange={(e) =>
                        changeWaypoints(
                          e as ChangeEvent<HTMLInputElement>,
                          index
                        )
                      }
                      value={row.latitude}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      variant="outlined"
                      size="small"
                      name="longitude"
                      onChange={(e) =>
                        changeWaypoints(
                          e as ChangeEvent<HTMLInputElement>,
                          index
                        )
                      }
                      value={row.longitude}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Grid2 display={"flex"}>
                      <Delete onClick={() => removeWaypoint(row._id)} />
                      <Edit
                        onClick={() =>
                          updateWaypointData(row._id, {
                            name: row.name,
                            latitude: row.latitude,
                            longitude: row.longitude,
                          })
                        }
                      />
                    </Grid2>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    name="name"
                    style={{ width: "50px" }}
                    onChange={(e) =>
                      changeWaypoint(e as ChangeEvent<HTMLInputElement>)
                    }
                    value={waypoint.name}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    name="latitude"
                    onChange={(e) =>
                      changeWaypoint(e as ChangeEvent<HTMLInputElement>)
                    }
                    value={waypoint.latitude}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    name="longitude"
                    onChange={(e) =>
                      changeWaypoint(e as ChangeEvent<HTMLInputElement>)
                    }
                    value={waypoint.longitude}
                  />
                </TableCell>
                <TableCell align="right">
                  <Add onClick={() => addWaypoint()} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {createWaypointSuccess && <p>Waypoint created successfully!</p>}
        {createWaypointError && <p>Error updating waypoint.</p>}
        {routeByIdIsSuccess ? (
          <>
            <Button
              variant="contained"
              onClick={editRoute}
              disabled={waypointsList.length < 2}
            >
              {updateRouteLoading ? "Updating..." : "Update Route"}
            </Button>
            {updateRouteSuccess && <p>Route updated successfully!</p>}
            {updateRouteError && <p>Error updating route.</p>}
          </>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={addRoute}
              disabled={waypointsList.length < 2}
            >
              <Add />
              {createRouteLoading ? "Creating..." : "Create Route"}
            </Button>
            {createRouteSuccess && <p>Route created successfully!</p>}
            {createRouteError && <p>Error creating route.</p>}
          </>
        )}
      </Grid2>
    </Grid2>
  );
}

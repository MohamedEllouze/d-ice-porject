import React, { useEffect, useState } from "react";
import { Edit, Delete, Add } from "@mui/icons-material";
import { TextField, Button, Grid2, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteRoute, useRoutes } from "../hooks/route.query.ts";

const RoutesList = ({ setSelectedRouteId }) => {
  const {
    data: routesListData,
    isFetched,
    refetch: refetchRouteList,
  } = useRoutes();
  const { mutate: deleteRoute } = useDeleteRoute();

  const [showInput, setShowInput] = useState(false);
  const [routeName, setRouteName] = useState("");
  const [routeNameList, setRouteNameList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFetched) {
      setRouteNameList(routesListData || []);
    }
  }, [routesListData, isFetched]);

  const changeRouteName = (e) => {
    setRouteName(e.target.value);
  };

  const handleAddRoute = () => {
    if (routeName.trim()) {
      // Redirect to the route page, or handle route creation logic here
      navigate(`/route-page/${routeName}`);
    }
  };

  const handleDeleteRoute = (routeId) => {
    deleteRoute(routeId, {
      onSuccess: () => refetchRouteList(), // Refetch routes after deleting
    });
  };

  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Routes</Typography>
        <Button
          style={{ height: "35px" }}
          size="small"
          variant="contained"
          onClick={() => setShowInput(true)}
        >
          Add
        </Button>
      </div>
      <ul style={{ padding: 0, listStyleType: "none" }}>
        {routeNameList &&
          routeNameList.map((el, index) => (
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "10px",
              }}
              key={el._id || index}
            >
              <Typography
                onClick={() => setSelectedRouteId(el._id)}
                style={{ cursor: "pointer" }}
              >
                {el.name}
              </Typography>
              <div>
                <Link to={`/route-page/${el._id}`}>
                  <Edit />
                </Link>
                <Delete
                  onClick={() => handleDeleteRoute(el._id)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </li>
          ))}
      </ul>
      {showInput && (
        <Grid2
          container
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            onChange={changeRouteName}
            size="small"
            value={routeName}
          />
          <div>
            <Add onClick={handleAddRoute} />
            <Delete onClick={() => setShowInput(false)} />
          </div>
        </Grid2>
      )}
      <Button variant="contained" onClick={() => setShowInput(true)}>
        <Add />
        Add New Route
      </Button>
    </div>
  );
};

export default RoutesList;

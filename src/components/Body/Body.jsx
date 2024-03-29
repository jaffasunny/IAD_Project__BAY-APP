import styled from "@emotion/styled";
import {
  Box,
  Button,
  createTheme,
  Divider,
  Grid,
  Modal,
  Rating,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Sos from "../Sos/Sos";
import Weather from "../Weather/Weather";
import { Map, Favorite, FavoriteBorder } from "@mui/icons-material";
import Places from "../Places/Places";
import { useNavigate } from "react-router-dom";
import { UserContext, UserDispatchContext } from "../../context/UserProvider";
import { getNearByBeach, helperStatus, updateLocation } from "../../Api/Post";
import { helperReady } from "../../Api/Get";

import "./Body.css";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const theme = createTheme({
  typography: {
    body1: {
      fontSize: 15,
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: -0.02,
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
      "@media (max-width:375px)": {
        fontSize: "1.2rem",
      },
      "@media (max-width:320px)": {
        fontSize: "1rem",
      },
    },
  },
});

const BeachInfo = () => {
  const { helper, beachInfo } = useContext(UserContext);
  const { setBeachInfo } = useContext(UserDispatchContext);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  const navigateInterval = () => {
    let req_lat, req_long;

    let interval = setInterval(async () => {
      if (typeof localStorage.getItem("token") === "string") {
        window.navigator.geolocation.getCurrentPosition(function (position) {
          req_lat = position.coords.latitude;
          req_long = position.coords.longitude;
        });

        if (req_lat !== undefined && req_long !== undefined) {
          updateLocation(req_lat, req_long);
        }
      } else clearInterval(interval);
    }, 5000);
  };

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    if (lat.length !== 0 && long.length !== 0) {
      getNearByBeach(lat, long, setBeachInfo);
      navigateInterval();
    }
  }, [lat, long, setBeachInfo]);

  useEffect(() => {
    localStorage.setItem("helper", helper);

    helperStatus(helper);
  }, [helper]);

  return (
    <div className='beachInfo'>
      <Grid
        container
        spacing={2}
        maxWidth='sm'
        sx={{
          pt: 4,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Grid item sm={1} md={2}>
          <StyledRating
            name='customized-color'
            precision={1}
            max={1}
            icon={
              <Favorite
                fontSize='inherit'
                sx={{
                  width: { xs: "1.75rem", sm: "2.5rem", md: 0, lg: 0 },
                  height: { xs: "1.75rem", sm: "2.5rem", md: 0, lg: 0 },
                }}
              />
            }
            emptyIcon={
              <FavoriteBorder
                fontSize='inherit'
                sx={{
                  width: { xs: "1.75rem", sm: "2.5rem", md: 0, lg: 0 },
                  height: { xs: "1.75rem", sm: "2.5rem", md: 0, lg: 0 },
                }}
              />
            }
          />
        </Grid>
        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          sx={{
            textAlign: "left",
          }}>
          <ThemeProvider theme={theme}>
            <Typography variant='h2'>You're at {beachInfo.name}</Typography>
          </ThemeProvider>
        </Grid>
        <Grid item sm={1} md={2}>
          <Map
            sx={{
              width: { xs: "1.75rem", sm: "2.5rem", md: 0, lg: 0 },
              height: { xs: "1.75rem", sm: "2.5rem", md: 0, lg: 0 },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const Body = () => {
  const navigate = useNavigate();
  // const [width, setWidth] = useState(window.innerWidth);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [height, setHeight] = useState(window.innerHeight);
  const { helper } = useContext(UserContext);
  const updateDimensions = () => {
    // setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  const [open, setOpen] = React.useState(false);
  const [helpNeededValue, setHelpNeededValue] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      if (
        helper === true &&
        typeof localStorage.getItem("token") === "string"
      ) {
        helperReady(setHelpNeededValue, handleOpen);
      } else {
        clearInterval(interval);
      }
    }, 5000);
  }, [helper]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const HelpNeeded = () => {
    let helperLat, helperLong;
    window.navigator.geolocation.getCurrentPosition(function (position) {
      helperLat = position.coords.latitude;
      helperLong = position.coords.longitude;
    });

    return (
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'>
        <Box sx={{ ...style, width: 200 }}>
          <h2 id='child-modal-title'>
            {helpNeededValue.first_name} {helpNeededValue.last_name} Needs Help!
          </h2>

          <Button
            onClick={handleClose}
            target='_blank'
            href={`https://www.google.com/maps/dir/?api=1&origin=${helperLat},${helperLong}&destination=${helpNeededValue.lat},+${helpNeededValue.lon}&travelmode=walking`}>
            Get Directions
          </Button>
        </Box>
      </Modal>
    );
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className='body'>
      {helpNeededValue && <HelpNeeded />}
      <Sos />
      <Weather />
      <BeachInfo />
      <Divider light />
      <Places />
      <div
        className='reportButton'
        style={{
          position: "fixed",
          top: height > 600 ? "90vh" : "85vh",
          right: "5%",
        }}>
        <Button
          variant='contained'
          sx={{ px: 4, py: 2 }}
          style={{
            background: "linear-gradient(180deg, #FBAC12 0%, #D29111 100%)",
            borderRadius: "27px",
          }}
          onClick={() => {
            navigate("/reportPage");
          }}>
          Report
        </Button>
      </div>
    </div>
  );
};

export default Body;

import styled from "@emotion/styled";
import {
  Button,
  createTheme,
  Divider,
  Grid,
  Rating,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Sos from "../Sos/Sos";
import Weather from "../Weather/Weather";
import { Map, Favorite, FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
import "./Body.css";
import Places from "../Places/Places";
import { useNavigate } from "react-router-dom";
import { UserContext, UserDispatchContext } from "../../context/UserProvider";
import { useLayoutEffect } from "react";

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
  const { token, lat, long, beachInfo } = useContext(UserContext);
  const { setBeachInfo } = useContext(UserDispatchContext);

  useLayoutEffect(() => {
    const fetchBeachName = async () => {
      const { data } = await axios.get(
        `http://ec2-3-92-183-0.compute-1.amazonaws.com/nearbybeach/${lat},${long}`,
        // `/api/user/login`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { id, name } = await data;
      setBeachInfo({ id, name });
    };

    if (lat.length !== 0 && long.length !== 0) fetchBeachName();
  }, [lat, long, token, setBeachInfo]);

  return (
    <div className='beachInfo'>
      <Grid
        container
        spacing={2}
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
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    // setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className='body'>
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
          sx={{ px: 3 }}
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

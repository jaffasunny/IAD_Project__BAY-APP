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
import React, { useEffect, useState } from "react";
import Sos from "../Sos/Sos";
import Weather from "../Weather/Weather";
import { Map, Favorite, FavoriteBorder } from "@mui/icons-material";

import "./Body.css";
import Places from "../Places/Places";
import { useNavigate } from "react-router-dom";

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
  },
});

const BeachInfo = () => {
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
            textAlign: "center",
          }}>
          <ThemeProvider theme={theme}>
            <Typography>You are at Clifton Beach</Typography>
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

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

import "./Places.css";

const Places = () => {
  return (
    <Container sx={{ p: 0, py: 3 }}>
      <h3 style={{ paddingBottom: "1rem" }}>Places around you</h3>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card elevation={8}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='110'
                image='https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                alt='green iguana'
              />
              <CardContent sx={{ p: 1, pb: 2 }}>
                <Typography
                  gutterBottom
                  variant='h6'
                  component='div'
                  style={{ fontWeight: "bold" }}>
                  Title Name
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Some description about the place
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card elevation={8}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='110'
                image='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                alt='green iguana'
              />
              <CardContent sx={{ p: 1, pb: 2 }}>
                <Typography
                  gutterBottom
                  variant='h6'
                  component='div'
                  style={{ fontWeight: "bold" }}>
                  Title Name
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Some description about the place
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card elevation={8}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='110'
                image='https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                alt='green iguana'
              />
              <CardContent sx={{ p: 1, pb: 2 }}>
                <Typography
                  gutterBottom
                  variant='h6'
                  component='div'
                  style={{ fontWeight: "bold" }}>
                  Title Name
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Some description about the place
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card elevation={8}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='110'
                image='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                alt='green iguana'
              />
              <CardContent sx={{ p: 1, pb: 2 }}>
                <Typography
                  gutterBottom
                  variant='h6'
                  component='div'
                  style={{ fontWeight: "bold" }}>
                  Title Name
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Some description about the place
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Places;

import { ArrowBackIos } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getComplaints } from "../../Api/Get";

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState({});
  const navigate = useNavigate();

  const theme = createTheme({
    typography: {
      heading: {
        fontSize: 34,
        fontWeight: 700,
      },
      smallText: {
        fontSize: 16,
      },
    },
  });

  useLayoutEffect(() => {
    getComplaints();
    // if (beachInfo.id !== undefined) getPoi();
  }, []);

  return (
    <div>
      <Container
        sx={{
          py: 4,
          px: 3,
        }}
        noValidate
        autoComplete='off'>
        <Button
          sx={{ color: "black", textTransform: "capitalize", mb: 2 }}
          startIcon={<ArrowBackIos />}
          onClick={() => {
            navigate("/");
          }}>
          Back
        </Button>
        <ThemeProvider theme={theme}>
          <Typography variant='heading' sx={{ display: "block", mb: 2 }}>
            Complaint Board
          </Typography>
          <Typography variant='smallText' sx={{ display: "block", mb: 5 }}>
            Showing all complaints posted by Bay App users. We’ll take the
            matter to the relevant authorities to resolve the matter as fast as
            possible.
          </Typography>
          {console.log(complaints.data)}
          <Grid container spacing={4}>
            {complaints?.data?.map((comp) => (
              <Grid item xs={12}>
                <Card elevation={8} fullWidth sx={{ borderRadius: "12px" }}>
                  <CardMedia
                    component='img'
                    height='110'
                    image={comp.media}
                    alt='green iguana'
                  />
                  <CardContent sx={{ p: 1, pb: 2 }}>
                    <Typography variant='body2' color='text'>
                      {comp.issue}
                    </Typography>
                    <Typography
                      variant='subtitle2'
                      gutterBottom
                      sx={{ textAlign: "right", mt: 1, fontWeight: "bold" }}>
                      Posted: {comp.created_at.split("T")[0]}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </ThemeProvider>
      </Container>
    </div>
  );
};
export default ComplaintsPage;

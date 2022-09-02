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
import { useNavigate } from "react-router-dom";

const ComplaintsPage = () => {
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

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card elevation={8} fullWidth>
                <CardMedia
                  component='img'
                  height='110'
                  image='https://media.socastsrm.com/wordpress/wp-content/blogs.dir/653/files/2017/08/13438940_1118570864872833_2663343148038477483_n.jpg'
                  alt='green iguana'
                />
                <CardContent sx={{ p: 1, pb: 2 }}>
                  <Typography variant='body2' color='text'>
                    Asnlsnlkscnlkn scnjsncka kc oj coj oja dcoj oaj dcojdcadjoc
                    j ojdcadc docjad j aoojdcjadncnoadjoa dcojj dcodnco adocaodc
                    oad coadc
                  </Typography>
                  <Typography
                    variant='subtitle2'
                    gutterBottom
                    sx={{ textAlign: "right", mt: 1, fontWeight: "bold" }}>
                    Posted: 2022-08-23
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card elevation={8} fullWidth>
                <CardMedia
                  component='img'
                  height='110'
                  image='https://media.istockphoto.com/photos/polluted-beach-picture-id1013176096?k=20&m=1013176096&s=612x612&w=0&h=ko_AqsrqykMWQ5qbSYEE0t8iy0uz-b7_RsxkDTJx3BI='
                  alt='green iguana'
                />
                <CardContent sx={{ p: 1, pb: 2 }}>
                  <Typography variant='body2' color='text'>
                    Asnlsnlkscnlkn scnjsncka kc oj coj oja dcoj oaj dcojdcadjoc
                    j ojdcadc docjad j aoojdcjadncnoadjoa dcojj dcodnco adocaodc
                    oad coadc
                  </Typography>
                  <Typography
                    variant='subtitle2'
                    gutterBottom
                    sx={{ textAlign: "right", mt: 1, fontWeight: "bold" }}>
                    Posted: 2022-08-23
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Container>
    </div>
  );
};
export default ComplaintsPage;

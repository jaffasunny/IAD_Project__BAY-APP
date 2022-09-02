import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { ArrowBackIos } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  createTheme,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: 52,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(26px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#DFFFDF" : "#DFDFDF",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#DFDFDF",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
    color: "#FA6B6B",
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const SettingsPage = () => {
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
          height: "100vh",
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
            Settings
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card
                elevation={8}
                fullWidth
                sx={{ p: 1, pb: 1, overflowY: "scroll" }}
                className='scrollHide'>
                <CardContent sx={{ p: 1 }}>
                  <Box
                    className='settings__cardHeader flex__between'
                    sx={{ mb: 2 }}>
                    <Typography
                      variant='h6'
                      color='text'
                      sx={{ fontWeight: "bold" }}>
                      Helper
                    </Typography>
                    <IOSSwitch />
                  </Box>
                  <Typography variant='body1' color='text'>
                    By turning this on, you offer yourself to receive SOS calls
                    from people seeking help.
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
export default SettingsPage;

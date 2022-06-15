import { ThemeProvider } from "@emotion/react";
import {
  Button,
  Container,
  createTheme,
  FormControlLabel,
  Input,
  Radio,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import "./ReportPage.css";

import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ReportPage = () => {
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  const theme = createTheme({
    typography: {
      heading: {
        fontSize: 26,
        fontWeight: 700,
      },
      smallText: {
        fontSize: 16,
      },
    },
  });

  return (
    <form className='reportPage'>
      <Container
        sx={{
          py: 4,
          px: 3,
        }}
        noValidate
        autoComplete='off'>
        <ThemeProvider theme={theme}>
          <Typography variant='heading' sx={{ display: "block", mb: 2 }}>
            Report Issues
          </Typography>
          <Typography variant='smallText'>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia.
          </Typography>

          <TextareaAutosize
            maxRows={4}
            aria-label='maximum height'
            placeholder='Type here'
            style={{
              width: "100%",
              height: 150,
              borderRadius: "26px",
              border: "1px solid #9D9D9D",
              marginTop: "2rem",
              padding: "1rem 0.75rem",
              overflow: "scroll",
            }}
            className='reportPage__textArea'
          />

          <label htmlFor='contained-button-file'>
            <Input
              accept='image/*'
              id='contained-button-file'
              multiple
              type='file'
              sx={{ display: "none" }}
            />
            <Button
              variant='contained'
              sx={{ px: 3, my: 2 }}
              component='span'
              style={{
                background: "linear-gradient(180deg, #FBAC12 0%, #D29111 100%)",
                borderRadius: "27px",
                textTransform: "capitalize",
              }}
              onChange={(e) => {
                let file = e.target.files;
                console.log(file);
              }}>
              Upload Image
            </Button>
          </label>

          <FormControlLabel
            sx={{ mb: 5 }}
            value='false'
            control={<Radio />}
            label='Agree to Terms and Conditions'
          />

          <div className='button__group flex__between'>
            <Button
              sx={{ color: "black", textTransform: "capitalize" }}
              startIcon={<ArrowBackIos />}
              onClick={() => {
                navigate("/");
              }}>
              Back
            </Button>

            <Button
              sx={{
                background: "linear-gradient(180deg, #1299FB 0%, #1181D2 100%)",
                borderRadius: "27px",
                color: "white",
                px: 5,
                py: 1,
              }}
              onClick={() => {
                navigate("/login");
              }}>
              Login
            </Button>
          </div>
        </ThemeProvider>
      </Container>
    </form>
  );
};

export default ReportPage;

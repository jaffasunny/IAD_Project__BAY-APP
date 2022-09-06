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

import { ArrowBackIos, Token } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ReportPage = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [formData, setFormData] = useState({
    reportText: "",
    reportImage: "",
    accept: false,
  });

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

  const handleChange = (e) => {
    if (e.target.name === "accept") {
      setFormData({ ...formData, accept: true });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleReportUploadImage = (e) => {
    let reader = new FileReader();

    // Server Side
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (e) => {
        setSelectedFile({ file: e.target.result });
      };
    }
    setFormData({
      ...formData,
      reportImage: e.target.files[0],
      // reportImageName: e.target.files[0].,
    });
    // console.log(e.target.files[0]);
  };

  const onFileUpload = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { reportText, reportImage, reportImageName } = formData;
    let reported_by = localStorage.getItem("email");
    // let { file } = selectedFile;

    let loginFormData = new FormData();
    loginFormData.append("issue", reportText);
    loginFormData.append("media", reportImage);
    loginFormData.append("reported_by", reported_by);
    console.log(reportImage);
    console.log(reportImage.name);
    // console.log(media);
    // console.log(loginFormData);
    // console.log(reportText, media, reported_by);
    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: `http://ec2-3-92-183-0.compute-1.amazonaws.com/report`,
        data: loginFormData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // if (issue !== undefined && media !== undefined) {
    //   const { response } = await axios.post(
    //     `http://ec2-3-92-183-0.compute-1.amazonaws.com/report`,
    //     // `/api/report`,
    //     {
    //       issue,
    //       media,
    //       reported_by,
    //     },
    //     {
    //       headers: {
    //         // Authorization: localStorage.getItem("token"),
    //         accept: "application/json",
    //       },
    //     }
    //   );
    //   console.log(response);
    // }
  };

  return (
    <form className='reportPage' onSubmit={handleSubmit}>
      <Container
        sx={{
          py: 4,
          px: 3,
          minHeight: "100vh",
          height: "auto",
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
            name='reportText'
            maxRows={4}
            aria-label='maximum height'
            placeholder='Type here'
            style={{
              width: "90%",
              height: 150,
              borderRadius: "26px",
              border: "1px solid #9D9D9D",
              marginTop: "2rem",
              resize: "none",
              padding: "1rem 0.75rem",
              overflow: "none",
            }}
            className='reportPage__textArea'
            onChange={handleChange}
          />

          <label htmlFor='contained-button-file'>
            <Input
              name='reportImage'
              accept='image/*'
              id='contained-button-file'
              // multiple
              type='file'
              sx={{ display: "none" }}
              onChange={handleReportUploadImage}
              value=''
            />
            <Button
              variant='contained'
              sx={{ px: 3, my: 2 }}
              component='span'
              style={{
                background: "linear-gradient(180deg, #FBAC12 0%, #D29111 100%)",
                borderRadius: "27px",
                textTransform: "capitalize",
              }}>
              Upload Image
            </Button>
          </label>

          {selectedFile && (
            <div className='uploadImage'>
              <img
                style={{
                  width: "50%",
                  boxShadow:
                    "0px 159.534px 355.398px rgba(0, 0, 0, 0.04), 0px 66.6495px 148.477px rgba(0, 0, 0, 0.0287542), 0px 35.634px 79.3827px rgba(0, 0, 0, 0.0238443), 0px 19.9761px 44.5013px rgba(0, 0, 0, 0.02), 0px 10.6092px 23.6343px rgba(0, 0, 0, 0.0161557), 0px 4.41472px 9.83477px rgba(0, 0, 0, 0.0112458)",
                  borderRadius: "23.6932px",
                }}
                src={selectedFile.file}
                alt=''
              />

              <Button
                className='uploadImage__deletebtn'
                onClick={() => {
                  setSelectedFile();
                  setFormData({ ...formData, reportImage: "" });
                }}>
                Delete
              </Button>
            </div>
          )}

          <FormControlLabel
            name='accept'
            sx={{ display: "block", margin: 1 }}
            value='false'
            control={<Radio />}
            label='Agree to Terms and Conditions'
            onChange={handleChange}
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
              type='submit'>
              Send
            </Button>
          </div>
        </ThemeProvider>
      </Container>
    </form>
  );
};

export default ReportPage;

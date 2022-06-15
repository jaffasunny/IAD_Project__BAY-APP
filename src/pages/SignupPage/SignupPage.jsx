import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Button,
  Container,
  createTheme,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { ArrowBackIos } from "@mui/icons-material";
import "./SignupPage.css";

import { Link } from "react-router-dom";
import { useState } from "react";

const theme = createTheme({
  typography: {
    heading: {
      fontSize: 26,
      fontWeight: 700,
    },
  },
});

const SignupPage = () => {
  const [values, setValues] = useState({
    password: "",
    cpassword: "",
    showPassword: false,
    showCpassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowCpassword = () => {
    setValues({
      ...values,
      showCpassword: !values.showCpassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          <Typography variant='heading'>Create Account</Typography>
          <FormControl sx={{ my: 2, width: "100%" }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-fname'>
              First Name
            </InputLabel>
            <OutlinedInput
              id='fname'
              type='text'
              value={values.fname}
              onChange={handleChange("fname")}
              endAdornment={<InputAdornment position='end'></InputAdornment>}
              label='First Name'
            />
          </FormControl>
          <FormControl sx={{ mb: 2, width: "100%" }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-lname'>
              Last Name
            </InputLabel>
            <OutlinedInput
              id='lname'
              type='text'
              value={values.lname}
              onChange={handleChange("lname")}
              endAdornment={<InputAdornment position='end'></InputAdornment>}
              label='Last Name'
            />
          </FormControl>
          <FormControl sx={{ mb: 2, width: "100%" }} variant='outlined'>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <OutlinedInput
              id='email'
              type='email'
              value={values.email}
              onChange={handleChange("email")}
              endAdornment={<InputAdornment position='end'></InputAdornment>}
              label='Email'
            />
          </FormControl>
          <div className='flex__between'>
            <FormControl sx={{ mb: 2, width: "45%" }} variant='outlined'>
              <InputLabel htmlFor='age'>Age</InputLabel>
              <OutlinedInput
                id='age'
                type='number'
                value={values.age}
                onChange={handleChange("age")}
                endAdornment={<InputAdornment position='end'></InputAdornment>}
                label='Age'
              />
            </FormControl>
            <FormControl sx={{ mb: 2, width: "45%" }} variant='outlined'>
              <InputLabel htmlFor='gender'>Gender</InputLabel>
              <OutlinedInput
                id='gender'
                type='gender'
                value={values.gender}
                onChange={handleChange("gender")}
                endAdornment={<InputAdornment position='end'></InputAdornment>}
                label='Gender'
              />
            </FormControl>
          </div>
          <FormControl sx={{ mb: 2, width: "100%" }} variant='outlined'>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <OutlinedInput
              id='password'
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
          <FormControl sx={{ mb: 2, width: "100%" }} variant='outlined'>
            <InputLabel htmlFor='cpassword'>Confirm Password</InputLabel>
            <OutlinedInput
              id='cpassword'
              type={values.showCpassword ? "text" : "password"}
              value={values.cpassword}
              onChange={handleChange("cpassword")}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowCpassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {values.showCpassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Confirm Password'
            />
          </FormControl>
          <FormControlLabel
            sx={{ mb: 5 }}
            value='false'
            control={<Radio />}
            label='Agree to Terms and Conditions'
          />

          <div className='button__group flex__between'>
            <Link to={"/"}>
              <Button
                sx={{ color: "black", textTransform: "capitalize" }}
                startIcon={<ArrowBackIos />}>
                Back
              </Button>
            </Link>
            <Button
              sx={{
                background: "linear-gradient(180deg, #1299FB 0%, #1181D2 100%)",
                borderRadius: "27px",
                color: "white",
                px: 5,
                py: 1,
              }}>
              Login
            </Button>
          </div>
        </ThemeProvider>
      </Container>
    </form>
  );
};

export default SignupPage;

import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  createTheme,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  Select,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { ArrowBackIos } from "@mui/icons-material";
import "./SignupPage.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [values, setValues] = useState({
    fname: "",
    lname: "",
    age: Number,
    email: "",
    gender: "",
    password: "",
    cpassword: "",
    agreement: false,
  });

  const theme = createTheme({
    typography: {
      heading: {
        fontSize: 26,
        fontWeight: 700,
      },
    },
  });

  const handleChange = (prop) => (event) => {
    if (prop === "age") setValues({ ...values, [prop]: +event.target.value });
    if (prop === "agreement") setValues({ ...values, [prop]: true });
    else setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowCpassword = () => {
    setShowCpassword(!showCpassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // set form errors by validating form values
    setFormErrors(validate(values));
    setIsSubmit(true);
  };

  // If there are no form errors then submit the form
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(values);
    }
  }, [formErrors, isSubmit, values]);

  // validate form and set errors if found
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.fname) {
      errors.fname = "Field empty";
    }
    if (!values.lname) {
      errors.lname = "Field empty";
    }
    if (values.age.length === 1) {
      errors.age = "Age is required";
    } else if (values.age < 10) {
      errors.age = "Age must be a valid number!";
    }
    if (values.password !== values.cpassword) {
      errors.password = "Password don't match";
    }
    console.log(values.agreement);
    if (values.agreement === false) {
      errors.agreement = "Required!";
    }
    if (!values.gender) {
      errors.gender = "Required";
    }
    return errors;
  };

  return (
    <form className='reportPage' onSubmit={handleSubmit}>
      <Container
        sx={{
          py: 4,
          px: 3,
        }}
        noValidate
        autoComplete='off'>
        <ThemeProvider theme={theme}>
          <Typography variant='heading' sx={{ fontSize: "2rem" }}>
            Create Account
          </Typography>
          <FormControl sx={{ my: 2, width: "100%" }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-fname'>
              First Name
            </InputLabel>
            <OutlinedInput
              className='inputField'
              id='fname'
              type='text'
              error={formErrors.fname && true}
              value={values.fname}
              onChange={handleChange("fname")}
              endAdornment={<InputAdornment position='end'></InputAdornment>}
              label='First Name'
              autoComplete='off'
            />
            <p className='formErrors'>{formErrors.fname}</p>
          </FormControl>
          <FormControl sx={{ mb: 2, width: "100%" }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-lname'>
              Last Name
            </InputLabel>
            <OutlinedInput
              className='inputField'
              id='lname'
              error={formErrors.lname && true}
              type='text'
              value={values.lname}
              onChange={handleChange("lname")}
              endAdornment={<InputAdornment position='end'></InputAdornment>}
              label='Last Name'
              autoComplete='off'
            />
            <p className='formErrors'>{formErrors.lname}</p>
          </FormControl>
          <FormControl sx={{ mb: 2, width: "100%" }} variant='outlined'>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <OutlinedInput
              className='inputField'
              id='email'
              type='email'
              error={formErrors.email && true}
              value={values.email}
              onChange={handleChange("email")}
              endAdornment={<InputAdornment position='end'></InputAdornment>}
              label='Email'
              autoComplete='new-email'
            />
            <p className='formErrors'>{formErrors.email}</p>
          </FormControl>
          <div className='flex__between'>
            <FormControl sx={{ mb: 2, width: "45%" }} variant='outlined'>
              <InputLabel htmlFor='age'>Age</InputLabel>
              <OutlinedInput
                className='inputField'
                error={formErrors.age && true}
                id='age'
                type='number'
                value={values.age}
                onChange={handleChange("age")}
                endAdornment={<InputAdornment position='end'></InputAdornment>}
                label='Age'
                autoComplete='new-age'
              />
            </FormControl>
            <FormControl sx={{ mb: 2, width: "45%" }} variant='outlined'>
              <InputLabel id='demo-multiple-name-label'>Gender</InputLabel>
              <Select
                labelId='demo-multiple-name-label'
                id='demo-multiple-name'
                error={formErrors.gender && true}
                value={values.gender}
                onChange={handleChange("gender")}
                input={<OutlinedInput label='Gender' className='inputField' />}
                MenuProps={MenuProps}>
                {["Male", "Female", "Preferred not to say"].map((gender) => (
                  <MenuItem
                    key={gender}
                    value={gender}
                    style={getStyles(gender, values.gender, theme)}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <FormControl sx={{ mb: 2, width: "100%" }} variant='outlined'>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <OutlinedInput
              className='inputField'
              id='password'
              error={formErrors.password && true}
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
              autoComplete='new-password'
            />
            <p className='formErrors'>{formErrors.password}</p>
          </FormControl>
          <FormControl sx={{ mb: 2, width: "100%" }} variant='outlined'>
            <InputLabel htmlFor='cpassword'>Confirm Password</InputLabel>
            <OutlinedInput
              error={
                formErrors.password ||
                (values.cpassword.length > 0 &&
                  values.password !== values.cpassword)
              }
              className='inputField'
              id='cpassword'
              type={showCpassword ? "text" : "password"}
              value={values.cpassword}
              onChange={handleChange("cpassword")}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowCpassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {showCpassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Confirm Password'
              autoComplete='new-password'
            />
            <p className='formErrors'>{formErrors.password}</p>

            <Box sx={{ mb: 5 }}>
              <FormControlLabel
                value='false'
                control={
                  <>
                    <Radio
                      value={values.agreement}
                      onChange={handleChange("agreement")}
                    />
                  </>
                }
                label='Agree to Terms and Conditions'
              />
              <p className='formErrors'>{formErrors.agreement}</p>
            </Box>

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
                  background:
                    "linear-gradient(180deg, #1299FB 0%, #1181D2 100%)",
                  borderRadius: "27px",
                  color: "white",
                  px: 5,
                  py: 1,
                }}
                type='submit'>
                Login
              </Button>
            </div>
          </FormControl>
        </ThemeProvider>
      </Container>
    </form>
  );
};

export default SignupPage;

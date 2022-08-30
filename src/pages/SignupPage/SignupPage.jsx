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

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SignupValidate } from "../../utils/Validate";
import axios from "axios";
import { toast } from "react-toastify";
import { UserDispatchContext } from "../../context/UserProvider";

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
  const setToken = useContext(UserDispatchContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    fname: "",
    lname: "",
    age: 0,
    email: "",
    gender: "",
    password: "",
    cpassword: "",
    agreement: false,
  });

  const theme = createTheme({
    typography: {
      heading: {
        fontSize: 34,
        fontWeight: 700,
      },
    },
  });

  const handleChange = (prop) => (event) => {
    if (prop === "age") {
      setValues({ ...values, [prop]: +event.target.value });
      return;
    }
    if (prop === "agreement") {
      setValues({ ...values, [prop]: true });
      return;
    }
    setValues({ ...values, [prop]: event.target.value });
    return;
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
    setIsSubmit(true);
    setFormErrors(SignupValidate(values));
  };

  // Signup function
  const signUp = async () => {
    const { data } = await axios.post(
      // `http://ec2-3-92-183-0.compute-1.amazonaws.com/user/signup`,
      `/api/user/signup`,
      {
        email: email,
        password: password,
        first_name: fname,
        last_name: lname,
        age: age,
        gender: gender,
        helper: true,
      },
      {
        // url: `${process.env.REACT_APP_REST_URL}/user/signup`,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // JWT TOKEN and response message
    const { token, email: email_resp, name, uid, response } = await data;
    setToken(localStorage.setItem("token", token));
    localStorage.setItem("uid", uid);
    localStorage.setItem("email", email_resp);
    localStorage.setItem("name", name);

    if (data === 422 || !data || !token) {
      toast.error(response, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("Successfully Registered!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setToken(localStorage.getItem("token"));
    }
  };

  // If there are no form errors then submit the form
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      signUp();
    }
  }, [formErrors, isSubmit, navigate]);

  let { fname, lname, age, email, gender, password, cpassword, agreement } =
    values;

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
          <Typography variant='heading'>Create Account</Typography>
          <FormControl sx={{ my: 2, width: "100%" }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-fname'>
              First Name
            </InputLabel>
            <OutlinedInput
              className='inputField'
              id='fname'
              type='text'
              error={formErrors.fname && true}
              value={fname}
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
              value={lname}
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
              value={email}
              onChange={handleChange("email")}
              endAdornment={<InputAdornment position='end'></InputAdornment>}
              label='Email'
              autoComplete='new-email'
              // required
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
                value={age > 0 && age}
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
                value={gender}
                onChange={handleChange("gender")}
                input={<OutlinedInput label='Gender' className='inputField' />}
                MenuProps={MenuProps}>
                {["Male", "Female", "Preferred not to say"].map((gender) => (
                  <MenuItem
                    key={gender}
                    value={gender}
                    style={getStyles(gender, gender, theme)}>
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
              value={password}
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
              error={(formErrors.password || formErrors.cpassword) && true}
              className='inputField'
              id='cpassword'
              type={showCpassword ? "text" : "password"}
              value={cpassword}
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
            <p className='formErrors'>
              {formErrors.password || formErrors.cpassword}
            </p>

            {/* consider */}
            <Box sx={{ mb: 5 }}>
              <FormControlLabel
                value='false'
                control={
                  <>
                    <Radio
                      value={agreement}
                      onChange={handleChange("agreement")}
                    />
                  </>
                }
                label='Agree to Terms and Conditions'
              />
              <p className='formErrors'>{formErrors.agreement}</p>
            </Box>

            <div className='button__group flex__between'>
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: "black",
                    textTransform: "capitalize",
                  }}
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
                Signup
              </Button>
            </div>
          </FormControl>
        </ThemeProvider>
      </Container>
    </form>
  );
};

export default SignupPage;

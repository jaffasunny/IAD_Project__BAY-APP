import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Container,
  createTheme,
  ThemeProvider,
  Button,
  Typography,
} from "@mui/material";
import bayLogo from "./../../assets/BayLogo.png";
import bayText from "./../../assets/Bay app.png";
import { useEffect, useState } from "react";
import "./LoginPage.css";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { LoginValidate } from "../../utils/Validate";

const LoginPage = ({ setShouldRedirect }) => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const theme = createTheme({
    typography: {
      subtitle1: {
        fontSize: 20,
        fontWeight: 300,
      },
    },
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // set form errors by validating form values
    setFormErrors(LoginValidate(values));

    setIsSubmit(true);
  };

  // If there are no form errors then submit the form
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(values);
      navigate("/");
      setShouldRedirect(false);
    }
  }, [formErrors, isSubmit, values, navigate, setShouldRedirect]);

  return (
    <form className='flex__center login' onSubmit={handleSubmit}>
      <Container
        sx={{
          py: 4,
          px: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        noValidate
        autoComplete='off'>
        <ThemeProvider theme={theme}>
          <Box className='logoContainer' sx={{ mb: 10 }}>
            <img src={bayLogo} alt='' style={{ marginBottom: "0.75rem" }} />
            <img src={bayText} alt='' />
          </Box>
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
          <FormControl sx={{ mb: 2, width: "100%" }} variant='outlined'>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <OutlinedInput
              className='inputField'
              id='password'
              error={formErrors.password && true}
              type='password'
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={<InputAdornment position='end'></InputAdornment>}
              label='Password'
              autoComplete='new-password'
            />
            <p className='formErrors'>{formErrors.password}</p>
          </FormControl>
          <Button
            sx={{
              background: "linear-gradient(180deg, #1299FB 0%, #1181D2 100%)",
              borderRadius: "27px",
              color: "white",
              px: 5,
              py: 2,
            }}
            type='submit'
            fullWidth>
            Login
          </Button>

          <Typography
            variant='subtitle1'
            sx={{
              mt: 3,
              cursor: "pointer",
              transition: "all 0.1s ease-in-out ",
              "&:hover": {
                color: "#b3b0ab",
                transition: "all 0.1s ease-in-out ",
              },
            }}
            onClick={() => navigate("/signup")}>
            Don’t have an account?
          </Typography>
        </ThemeProvider>
      </Container>
    </form>
  );
};

export default LoginPage;

import { Typography } from "@mui/material";
import { Container, createTheme, ThemeProvider } from "@mui/system";
import "./LoginPage.css";

const LoginPage = () => {
  const theme = createTheme({
    typography: {
      heading: {
        fontSize: 26,
        fontWeight: 700,
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
          <Typography variant='heading'>Login Page</Typography>
        </ThemeProvider>
      </Container>
    </form>
  );
};

export default LoginPage;

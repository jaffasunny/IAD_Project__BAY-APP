import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  createTheme,
  Grid,
  Modal,
  Rating,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useContext, useLayoutEffect, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";
import "./Places.css";
import { Call, NearMe } from "@mui/icons-material";
import { ArrowBackIos, Favorite, FavoriteBorder } from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const theme = createTheme({
  typography: {
    body1: {
      fontSize: 15,
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: -0.02,
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
      "@media (max-width:375px)": {
        fontSize: "1.2rem",
      },
      "@media (max-width:320px)": {
        fontSize: "1rem",
      },
    },
    subtitle1: {
      fontWeight: 300,
      fontSize: 18,
      lineHeight: "1.25rem",
    },
  },
});

const Places = () => {
  const { token, beachInfo } = useContext(UserContext);
  const [cardData, setCardData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  useLayoutEffect(() => {
    const getPoi = async () => {
      const { data } = await axios.get(
        `/api/nearbypoi/${beachInfo?.id}`,
        // `http://ec2-3-92-183-0.compute-1.amazonaws.com/nearbypoi/${beachInfo?.id}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCardData(data);
    };
    if (beachInfo.id !== undefined) getPoi();
  }, [token, beachInfo]);

  const style = {
    width: "100%",
    height: "max-content",
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  const RestaurantModal = () => {
    return (
      <Modal
        // key={item.id}
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='restaurantModal'
        sx={{ overflow: "scroll" }}>
        <Box sx={style}>
          <Box
            className='restaurantModal__topSection'
            sx={{
              backgroundImage: `url(${selectedItem.title_image})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              height: 200,
              width: "100%",
              boxShadow:
                "0px 101px 225px rgba(0, 0, 0, 0.04), 0px 42.1954px 93.9996px rgba(0, 0, 0, 0.0287542), 0px 22.5597px 50.2567px rgba(0, 0, 0, 0.0238443), 0px 12.6468px 28.1735px rgba(0, 0, 0, 0.02), 0px 6.7166px 14.9627px rgba(0, 0, 0, 0.0161557), 0px 2.79493px 6.22633px rgba(0, 0, 0, 0.0112458)",
            }}>
            <Button
              sx={{
                color: "black",
                textTransform: "capitalize",
                mt: 3,
                ml: 2,
                backgroundColor: "white",
                borderRadius: "16px",
                "&:hover": {
                  backgroundColor: "#f7f7f7",
                },
              }}
              startIcon={<ArrowBackIos />}
              onClick={handleClose}>
              Back
            </Button>
          </Box>
          <Container
            sx={{
              py: 4,
              px: 3,
              height: "max-content",
            }}
            noValidate
            autoComplete='off'>
            <Box className='restaurantModal__header'>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}>
                  <Card
                    sx={{
                      width: "fit-content",
                      border: "2px solid #818181",
                      borderRadius: "15px",
                      boxShadow:
                        "0px 101px 225px rgba(0, 0, 0, 0.04), 0px 42.1954px 93.9996px rgba(0, 0, 0, 0.0287542), 0px 22.5597px 50.2567px rgba(0, 0, 0, 0.0238443), 0px 12.6468px 28.1735px rgba(0, 0, 0, 0.02), 0px 6.7166px 14.9627px rgba(0, 0, 0, 0.0161557), 0px 2.79493px 6.22633px rgba(0, 0, 0, 0.0112458)",
                    }}>
                    <CardMedia
                      component='img'
                      image={selectedItem.logo}
                      alt='green iguana'
                      sx={{
                        objectFit: "fill",
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  </Card>
                  <Box sx={{ ml: 3 }}>
                    <ThemeProvider theme={theme}>
                      <Typography variant='h2'>{selectedItem.name}</Typography>
                    </ThemeProvider>
                    <Rating
                      name='half-rating'
                      defaultValue={4.5}
                      precision={0.5}
                    />
                  </Box>
                </Box>
                <Grid item sm={1} md={2}>
                  <StyledRating
                    name='customized-color'
                    precision={1}
                    max={1}
                    icon={
                      <Favorite
                        fontSize='inherit'
                        sx={{
                          width: { xs: "1.75rem", sm: "2.5rem", md: 0, lg: 0 },
                          height: { xs: "1.75rem", sm: "2.5rem", md: 0, lg: 0 },
                        }}
                      />
                    }
                    emptyIcon={
                      <FavoriteBorder
                        fontSize='inherit'
                        sx={{
                          width: { xs: "1.75rem", sm: "2.5rem", md: 0, lg: 0 },
                          height: { xs: "1.75rem", sm: "2.5rem", md: 0, lg: 0 },
                        }}
                      />
                    }
                  />
                </Grid>
              </Container>
            </Box>
            <Container sx={{ mt: 3 }}>
              <ThemeProvider theme={theme}>
                <Typography variant='subtitle1'>
                  {selectedItem.description}
                </Typography>
              </ThemeProvider>
            </Container>

            <Container sx={{ p: 3, display: "flex", gap: 3, flexWrap: "wrap" }}>
              <Card
                sx={{
                  width: "fit-content",
                  border: "2px solid #818181",
                  borderRadius: "15px",
                  boxShadow:
                    "0px 101px 225px rgba(0, 0, 0, 0.04), 0px 42.1954px 93.9996px rgba(0, 0, 0, 0.0287542), 0px 22.5597px 50.2567px rgba(0, 0, 0, 0.0238443), 0px 12.6468px 28.1735px rgba(0, 0, 0, 0.02), 0px 6.7166px 14.9627px rgba(0, 0, 0, 0.0161557), 0px 2.79493px 6.22633px rgba(0, 0, 0, 0.0112458)",
                }}>
                <CardMedia
                  component='img'
                  image={selectedItem.img_1}
                  alt='green iguana'
                  sx={{
                    objectFit: "cover",
                    width: "100px",
                    height: "100px",
                  }}
                />
              </Card>
              <Card
                sx={{
                  width: "fit-content",
                  border: "2px solid #818181",
                  borderRadius: "15px",
                  boxShadow:
                    "0px 101px 225px rgba(0, 0, 0, 0.04), 0px 42.1954px 93.9996px rgba(0, 0, 0, 0.0287542), 0px 22.5597px 50.2567px rgba(0, 0, 0, 0.0238443), 0px 12.6468px 28.1735px rgba(0, 0, 0, 0.02), 0px 6.7166px 14.9627px rgba(0, 0, 0, 0.0161557), 0px 2.79493px 6.22633px rgba(0, 0, 0, 0.0112458)",
                }}>
                <CardMedia
                  component='img'
                  image={selectedItem.img_2}
                  alt='green iguana'
                  sx={{
                    objectFit: "cover",
                    width: "100px",
                    height: "100px",
                  }}
                />
              </Card>
              <Card
                sx={{
                  width: "fit-content",
                  border: "2px solid #818181",
                  borderRadius: "15px",
                  boxShadow:
                    "0px 101px 225px rgba(0, 0, 0, 0.04), 0px 42.1954px 93.9996px rgba(0, 0, 0, 0.0287542), 0px 22.5597px 50.2567px rgba(0, 0, 0, 0.0238443), 0px 12.6468px 28.1735px rgba(0, 0, 0, 0.02), 0px 6.7166px 14.9627px rgba(0, 0, 0, 0.0161557), 0px 2.79493px 6.22633px rgba(0, 0, 0, 0.0112458)",
                }}>
                <CardMedia
                  component='img'
                  image={selectedItem.img_3}
                  alt='green iguana'
                  sx={{
                    objectFit: "cover",
                    width: "100px",
                    height: "100px",
                  }}
                />
              </Card>
              <Card
                sx={{
                  width: "fit-content",
                  border: "2px solid #818181",
                  borderRadius: "15px",
                  boxShadow:
                    "0px 101px 225px rgba(0, 0, 0, 0.04), 0px 42.1954px 93.9996px rgba(0, 0, 0, 0.0287542), 0px 22.5597px 50.2567px rgba(0, 0, 0, 0.0238443), 0px 12.6468px 28.1735px rgba(0, 0, 0, 0.02), 0px 6.7166px 14.9627px rgba(0, 0, 0, 0.0161557), 0px 2.79493px 6.22633px rgba(0, 0, 0, 0.0112458)",
                }}>
                <CardMedia
                  component='img'
                  image={selectedItem.img_4}
                  alt='green iguana'
                  sx={{
                    objectFit: "cover",
                    width: "100px",
                    height: "100px",
                  }}
                />
              </Card>
              <Card
                sx={{
                  width: "fit-content",
                  border: "2px solid #818181",
                  borderRadius: "15px",
                  boxShadow:
                    "0px 101px 225px rgba(0, 0, 0, 0.04), 0px 42.1954px 93.9996px rgba(0, 0, 0, 0.0287542), 0px 22.5597px 50.2567px rgba(0, 0, 0, 0.0238443), 0px 12.6468px 28.1735px rgba(0, 0, 0, 0.02), 0px 6.7166px 14.9627px rgba(0, 0, 0, 0.0161557), 0px 2.79493px 6.22633px rgba(0, 0, 0, 0.0112458)",
                }}>
                <CardMedia
                  component='img'
                  image={selectedItem.img_5}
                  alt='green iguana'
                  sx={{
                    objectFit: "cover",
                    width: "100px",
                    height: "100px",
                  }}
                />
              </Card>
            </Container>

            <Container sx={{ display: "flex", gap: 5, mt: 4 }}>
              <Button
                variant='contained'
                sx={{ px: 6, py: "0.75rem" }}
                style={{
                  background:
                    "linear-gradient(180deg, #1299FB 0%, #1181D2 100%)",
                  borderRadius: "27px",
                }}
                onClick={() => {
                  // navigate("/reportPage");
                }}>
                <Call sx={{ mr: 1 }} /> Contact
              </Button>
              <Button
                variant='contained'
                sx={{ px: 6, py: "0.75rem" }}
                style={{
                  background:
                    "linear-gradient(180deg, #FBAC12 0%, #D29111 100%)",
                  borderRadius: "27px",
                }}
                onClick={() => {
                  // navigate("/reportPage");
                }}>
                <NearMe sx={{ mr: 1 }} /> Direction
              </Button>
            </Container>
          </Container>
        </Box>
      </Modal>
    );
  };

  return (
    <>
      <Container sx={{ p: 0, py: 3 }}>
        <h3 style={{ paddingBottom: "1rem" }}>Places around you</h3>

        {open && <RestaurantModal />}

        <Grid container spacing={2}>
          {cardData?.data?.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Card elevation={8} sx={{ height: "100%", borderRadius: "12px" }}>
                <CardActionArea
                  onClick={() => {
                    setOpen(true);
                    setSelectedItem(item);
                  }}>
                  <CardMedia
                    component='img'
                    height='110'
                    image={item?.title_image}
                    alt='green iguana'
                    sx={{ objectFit: "contain" }}
                  />
                  <CardContent sx={{ p: 1, pb: 2 }}>
                    <Typography
                      gutterBottom
                      variant='h6'
                      component='div'
                      style={{ fontWeight: "bold" }}>
                      {item?.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {item?.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Places;

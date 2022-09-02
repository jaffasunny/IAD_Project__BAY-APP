import React, { useContext, useEffect, useState } from "react";

import "./Weather.css";

import { images } from "../../constants/index";
import { CircularProgress, Divider } from "@mui/material";
import { UserContext, UserDispatchContext } from "../../context/UserProvider";

const Weather = () => {
  const [data, setData] = useState([]);
  const { lat, long } = useContext(UserContext);
  const { setLat, setLong } = useContext(UserDispatchContext);
  const [weatherIcon, setWeatherIcon] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      window.navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      await fetch(
        `${process.env.REACT_APP_API_URL}/onecall?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
        {
          signal: signal,
        }
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          if (result !== undefined) {
            let weather = result.current.weather;
            setWeatherIcon(weather[0].icon);
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("successfully aborted");
          } else {
            console.log(err);
          }
        });
    };

    fetchData();
    // const interval = setInterval(fetchData, 5000);

    return () => {
      controller.abort();
      // clearInterval(interval);
    };
  }, [lat, long, setLat, setLong]);

  return (
    <div className='weather'>
      {typeof data.current !== "undefined" ? (
        <>
          <div className='weather__left'>
            <h3 className='weather__leftTitle'>Great weather</h3>
            <p className='weather__leftContent'>
              Don’t forget to carry sunblock, water and umbrella
            </p>

            <div className='weather__info'>
              <div className='weather__wind'>
                <img src={images.WindIcon} alt='windIcon' />
                <p className='weather__data'>{data.current.wind_speed} km/h</p>
              </div>
              <div className='weather__humidity'>
                <img src={images.DropIcon} alt='windIcon' />
                <p className='weather__data'>{data.current.humidity} %</p>
              </div>
              <div className='weather__uv'>
                <img src={images.SunIcon} alt='windIcon' />
                <p className='weather__data'>{data.current.uvi}</p>
              </div>
            </div>
          </div>
          <Divider
            className='weather__divider'
            orientation='vertical'
            flexItem
          />
          <div className='weather__right'>
            <div className='weather__icon'>
              <img
                src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
                alt=''
              />
            </div>
            <h2 className='weather__rightValue'>{data.current.temp}°c</h2>
          </div>
        </>
      ) : (
        <div className='weather__loader'>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Weather;

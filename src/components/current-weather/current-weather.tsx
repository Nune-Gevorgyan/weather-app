import React, { FC } from 'react';

import { ForecastList } from '../forecast-list';

import styled from "styled-components";


interface CurrentWeatherProps {
  weather: any;
}

const StyledWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4rem;
`
const StyledTemp = styled.p`
  font-size: 2em;
  padding: 1rem;
`
const StyledIcon = styled.img`
  width: 150px;
`
export const CurrentWeather: FC<CurrentWeatherProps>= ({ weather }) => (
  <StyledWeather>
    <div>
      <h2> {weather.name}</h2>
      <StyledTemp>{weather.main.temp}°C</StyledTemp>
      <StyledIcon
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description}
      />
      <p>{weather.weather[0].description} </p>
    </div>

    <ForecastList />
  </StyledWeather>
);

import { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../store';

const formatDate = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

const checkHour = (time: Date) => new Date().getHours() < time.getHours() && new Date().getDay() === time.getDay();

const StyledForecastList = styled.div`
  height: 600px;
  overflow: auto;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid black;
  flex: 1;
`;

export const ForecastList: FC = () => {
  const forecastList = useSelector(
    (state: RootState) => state.weather.forecast
  );

  if (!forecastList) {
    return null;
  }

  const forecastListFiltered = forecastList.list.filter(({ dt_txt: dtTxt }) => checkHour(new Date(dtTxt))
  );

  return (
    <StyledForecastList>
      {forecastListFiltered.map(
        ({ dt_txt: dtTxt, weather, main }, index: number) => (
          <Container key={index}>
            <p>{formatDate(new Date(dtTxt))} </p>
            <p>{main.temp}°C</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
              alt={weather[0].description}
            />
          </Container>
        )
      )}
    </StyledForecastList>
  );
};

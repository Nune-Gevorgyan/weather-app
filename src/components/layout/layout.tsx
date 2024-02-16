import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getForecast,
} from '../../store/epics';

import { AppDispatch, RootState } from '../../store';
import { CurrentWeather } from '../current-weather';
import { Modal } from '../modal';

import { Header } from '../header';

export const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setModalOpen] = useState(false);

  const weather = useSelector<RootState>(
    (state) => state.weather.currentWeather
  );
  const status = useSelector<RootState>((state) => state.weather.status);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        getCurrentWeatherByCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      );

      dispatch(
        getForecast({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      );
    });
  }, [dispatch]);

  useEffect(() => {
    if (status === 'failed') {
      setModalOpen(true);
    }
  }, [status]);

  const handleSearch = (city: string) => {
    dispatch(getCurrentWeather(city));
    dispatch(getForecast({ city }));
  };

  console.log('weather', weather);

  return (
    <div>
      <Header onSearch={handleSearch} />
      {status === 'loading' && <p>Loading...</p>}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <p>City not found. Please try again.</p>
      </Modal>

      {!!weather && status !== 'failed' && <CurrentWeather weather={weather} />}
    </div>
  );
};

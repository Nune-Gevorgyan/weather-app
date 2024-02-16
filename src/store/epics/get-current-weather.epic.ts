import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_KEY, BASE_URL } from '../../constants';

const fetchWeather = async (city: string) => {
  const { data } = await axios.get(`${BASE_URL}weather`, {
    params: { q: city, appid: API_KEY, units: 'metric' },
  });

  return data;
};

export const getCurrentWeather = createAsyncThunk(
  'weather/getCurrentWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await fetchWeather(city);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

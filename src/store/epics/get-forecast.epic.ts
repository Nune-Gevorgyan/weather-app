import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_KEY, BASE_URL } from '../../constants';
import { ForecastState } from '../slices';

interface ForecastPayload {
  city?: string;
  lat?: number;
  lon?: number;
}

const fetchForecast = async (payload: ForecastPayload) => {
  const { city, lat, lon } = payload;

  const { data } = await axios.get(`${BASE_URL}forecast`, {
    params: { q: city, lat, lon, appid: API_KEY, units: 'metric' },
  });

  return data;
};

export const getForecast = createAsyncThunk(
  'weather/getForecast',
  async (payload: ForecastPayload, { rejectWithValue }) => {
    try {
      const response = await fetchForecast(payload);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

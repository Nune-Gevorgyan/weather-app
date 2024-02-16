import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_KEY, BASE_URL } from "../../constants";

const fetchCurrentWeatherByCoords = async (lat: number, lon: number) => {
  const { data } = await axios.get(`${BASE_URL}weather`, {
    params: { lat, lon, appid: API_KEY, units: "metric" },
  });

  return data;
};

export const getCurrentWeatherByCoords = createAsyncThunk(
  'weather/getCurrentWeatherByCoords',
  async ({ lat, lon }: { lat: number, lon: number }, { rejectWithValue }) => {
    try {
      const response = await fetchCurrentWeatherByCoords(lat, lon);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

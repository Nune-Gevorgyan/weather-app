import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getCurrentWeather, getCurrentWeatherByCoords, getForecast } from '../epics';

export interface ForecastState {
  list: {
    clouds: { all: number };
    dt: number;
    dt_txt: string;
    main: {
      feels_like: number;
      grnd_level: number;
      humidity: number;
      pressure: number;
      sea_level: number;
      temp: number;
      temp_kf: number;
      temp_max: number;
      temp_min: number;
    };
    pop: number;
    sys: {
      pod: string;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  }[]
}

export interface WeatherState {
  currentWeather: any | null;
  forecast: ForecastState | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  status: 'idle',
  error: null,
};


export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  builder
    .addCase(getCurrentWeather.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(getCurrentWeather.fulfilled, (state, action) => {
      state.status = 'idle';
      state.currentWeather = action.payload;
    })
    .addCase(getCurrentWeather.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    })
    .addCase(getForecast.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(getForecast.fulfilled, (state, action) => {
      state.status = 'idle';
      state.forecast = action.payload as ForecastState;
    })
    .addCase(getForecast.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    })
    .addCase(getCurrentWeatherByCoords.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(getCurrentWeatherByCoords.fulfilled, (state, action) => {
      state.status = 'idle';
      state.currentWeather = action.payload;
    })
    .addCase(getCurrentWeatherByCoords.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });
  }
});

export const selectWeather = (state: RootState) => state.weather;

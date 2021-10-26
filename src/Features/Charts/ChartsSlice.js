import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  casingPressure: 0,
  injValveOpen: 0,
  tubingPressure: 0,
  flareTemp: 0,
  oilTemp: 0,
  waterTemp: 0,
};

export const chartsSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {
    setLastCasingPressure: (state, action) => {
      state.casingPressure = action.payload;
    },
    setLastInjValveOpen: (state, action) => {
      state.injValveOpen = action.payload;
    },
    setLastTubingPressure: (state, action) => {
      state.tubingPressure = action.payload;
    },
    setLastFlareTemp: (state, action) => {
      state.flareTemp = action.payload;
    },
    setLastOilTemp: (state, action) => {
      state.oilTemp = action.payload;
    },
    setLastWaterTemp: (state, action) => {
      state.waterTemp = action.payload;
    },
  },
});

export const {
  setLastCasingPressure,
  setLastInjValveOpen,
  setLastTubingPressure,
  setLastFlareTemp,
  setLastOilTemp,
  setLastWaterTemp,
} = chartsSlice.actions;

export const selectLastMeasurements = (state) => state.lastMeasurements;

export default chartsSlice.reducer;

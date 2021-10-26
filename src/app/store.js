import { configureStore } from '@reduxjs/toolkit';
import metricsReducer from '../Features/Metrics/metricsSlice';
import chartsReducer from '../Features/Charts/ChartsSlice';

const store = configureStore({
  reducer: {
    metrics: metricsReducer,
    lastMeasurements: chartsReducer,
  },
});

export default store;

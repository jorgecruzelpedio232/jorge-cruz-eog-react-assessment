import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  metrics: [],
  status: 'idle',
};

const fetchMetrics = async () => {
  const res = await fetch('https://react.eogresources.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query getMetrics {
          getMetrics
        }
      `,
    }),
  });
  const data = await res.json();
  const metrics = data.data.getMetrics.map(metric => ({
    metric,
    selected: false,
  }));

  return metrics;
};

export const getMetrics = createAsyncThunk(
  'metrics/fetchMetrics',
  async () => {
    const metrics = await fetchMetrics();
    return metrics;
  },
);

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    toggleMetric: (state, action) => {
      state.metrics = state.metrics.map(metric => {
        if (action.payload.includes(metric.metric)) {
          metric.selected = true;
        } else {
          metric.selected = false;
        }
        return metric;
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMetrics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMetrics.fulfilled, (state, action) => {
        state.status = 'idle';
        state.metrics = action.payload;
      });
  },
});

export const { toggleMetric } = metricsSlice.actions;

export const selectMetrics = (state) => state.metrics.metrics;

export default metricsSlice.reducer;

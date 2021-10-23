import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  metrics: [],
  status: 'idle',
  heartBeat: null,
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

const fetchHeartBeat = async () => {
  const res = await fetch('https://react.eogresources.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query getHeartBeat {
          heartBeat
        }
      `,
    }),
  });
  const data = await res.json();

  return data.data.heartBeat;
};

export const getMetrics = createAsyncThunk(
  'metrics/getMetrics',
  async () => {
    const metrics = await fetchMetrics();
    return metrics;
  },
);

export const getHeartBeat = createAsyncThunk(
  'metrics/getHeartBeat',
  async () => {
    const heartBeat = await fetchHeartBeat();
    return heartBeat;
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
      })
      .addCase(getHeartBeat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHeartBeat.fulfilled, (state, action) => {
        state.status = 'idle';
        state.heartBeat = action.payload;
      });
  },
});

export const { toggleMetric } = metricsSlice.actions;

export const selectMetrics = (state) => state.metrics.metrics;
export const selectHeartBeat = (state) => state.metrics.heartBeat;

export default metricsSlice.reducer;

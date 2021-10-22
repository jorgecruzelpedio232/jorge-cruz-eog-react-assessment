import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  metrics: [
    // {
    //   id: 0,
    //   metric: 'casingPressure',
    //   selected: false,
    // },
    // {
    //   id: 1,
    //   metric: 'injValveOpen',
    //   selected: false,
    // },
    // {
    //   id: 2,
    //   metric: 'tubingPressure',
    //   selected: false,
    // },
    // {
    //   id: 3,
    //   metric: 'flareTemp',
    //   selected: false,
    // },
    // {
    //   id: 4,
    //   metric: 'oilTemp',
    //   selected: false,
    // },
    // {
    //   id: 5,
    //   metric: 'waterTemp',
    //   selected: false,
    // },
  ],
  value: 20,
  status: 'idle',
};

export const getMetrics = createAsyncThunk(
  'counter/fetchMetrics',
  async () => {
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
    console.log('------------>', data);

    return data;
  },
);

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMetrics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMetrics.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = metricsSlice.actions;

export const selectMetrics = (state) => state.metrics.metrics;

export default metricsSlice.reducer;

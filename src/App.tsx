import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import Metrics from './Features/Metrics/Metrics';
import Charts from './Features/Charts/Charts';
import { getMetrics, getHeartBeat } from './Features/Metrics/metricsSlice';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMetrics());
    dispatch(getHeartBeat());
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>
        <Header />
        <Metrics />
        <Charts />
        <ToastContainer />
      </Wrapper>
    </MuiThemeProvider>
  );
};

export default App;

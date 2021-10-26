import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import { selectMetrics, selectHeartBeat } from '../Metrics/metricsSlice';
import Chip from '../../components/Chip';
import Chart from '../Chart/Chart';
import { MEASUREMENTS_QUERY, MEASUREMENTS_SUBSCRIPTION } from './ChartsQueries';

const Charts = () => {
  const metrics = useSelector(selectMetrics);
  const heartBeat = useSelector(selectHeartBeat);

  // Getting the last 30 minutes of data
  const after = heartBeat - 1000 * 60 * 30;
  const before = heartBeat;

  // Constructing the query input
  const input = [];
  if (metrics.length > 0) {
    metrics.forEach(metric => {
      if (metric.selected === true) {
        input.push({
          metricName: metric.metric,
          after,
          before,
        });
      }
    });
  }

  const { subscribeToMore, ...result } = useQuery(MEASUREMENTS_QUERY, {
    variables: {
      input,
    },
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MEASUREMENTS_SUBSCRIPTION,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        if (prev.getMultipleMeasurements !== undefined) {
          const newData = JSON.parse(JSON.stringify(prev));

          newData.getMultipleMeasurements.map(measurement => {
            if (measurement.metric === subscriptionData.data.newMeasurement.metric) {
              measurement.measurements.push(subscriptionData.data.newMeasurement);
              measurement.measurements.shift();
            }
            return measurement;
          });
          return newData;
        }
        return prev;
      },
    });

    return () => unsubscribe();
  }, []);

  const { loading, error, data } = result;

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (data.getMultipleMeasurements.length === 0) return <Chip label="Please select a metric" />;

  // Getting the time for the chart
  const chartData = data.getMultipleMeasurements[0].measurements.map(metric => {
    const date = new Date(metric.at);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return { time: `${hour}:${minutes}` };
  });

  // Getting the metrics for the chart
  data.getMultipleMeasurements.forEach(measurement => {
    measurement.measurements.forEach((metric, index) => {
      chartData[index][metric.metric] = metric.value;
    });
  });

  return <Chart data={chartData} sub={data} />;
};

export default Charts;

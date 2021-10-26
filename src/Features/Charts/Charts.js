import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  useQuery,
  gql,
} from '@apollo/client';

import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import { selectMetrics, selectHeartBeat } from '../Metrics/metricsSlice';

import Chip from '../../components/Chip';
import Chart from '../Chart/Chart';

const Charts = () => {
  const metrics = useSelector(selectMetrics);
  const heartBeat = useSelector(selectHeartBeat);

  // Getting the last 30 minutes of data
  const after = heartBeat - 1000 * 60 * 30;
  const before = heartBeat;

  // console.log('------------------>', before);
  // console.log('------------------>', after);

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

  const query = gql`
    query getMultipleMeasurements($input: [MeasurementQuery]) {
      getMultipleMeasurements(input: $input){
        metric
        measurements{
          metric
          at
          value
          unit
        }
      }
    }
  `;

  const subscription = gql`
    subscription {
      newMeasurement {
        metric
        at
        value
        unit
        }  
      }
  `;

  const { subscribeToMore, ...result } = useQuery(query, {
    variables: {
      input,
    },
  });

  useEffect(() => {
    // console.log('-=-=-=-=-=-=-=-=-=-=-=-> USEEFECT');
    const unsubscribe = subscribeToMore({
      document: subscription,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        // console.log('ususususususususususususu> ', subscriptionData.data.newMeasurement.metric);
        if (!subscriptionData.data) return prev;
        if (prev.getMultipleMeasurements !== undefined) {
          const newData = JSON.parse(JSON.stringify(prev));

          newData.getMultipleMeasurements.map(measurement => {
            if (measurement.metric === subscriptionData.data.newMeasurement.metric) {
              measurement.measurements.push(subscriptionData.data.newMeasurement);
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

  const chartData = [];

  // Getting the time for the chart
  data.getMultipleMeasurements[0].measurements.forEach(metric => {
    const date = new Date(metric.at);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    chartData.push({ time: `${hour}:${minutes}` });
  });

  // Getting the metrics for the chart
  data.getMultipleMeasurements.forEach(measurement => {
    measurement.measurements.forEach((metric, index) => {
      chartData[index][metric.metric] = metric.value;
    });
  });

  return (
    <>
      <div>CHARTS</div>
      <Chart data={chartData} sub={data} />
    </>
  );
};

export default Charts;

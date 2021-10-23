import React from 'react';
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

  const after = heartBeat - 1000 * 60 * 30;
  const before = heartBeat;

  console.log('------------------>', before);
  console.log('------------------>', after);

  // Constructing the query input
  let input = '[';
  if (metrics.length > 0) {
    metrics.forEach(metric => {
      if (metric.selected === true) {
        input += `{ metricName: "${metric.metric}", after: ${after}, before: ${before} }`;
      }
    });
  }
  input += ']';

  const query = gql`
    query getMultipleMeasurements {
      getMultipleMeasurements(input: ${input}){
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

  const { subscribeToMore, ...result } = useQuery(query);

  // console.log('afafafafafafafafafafaf', result.data);

  subscribeToMore({
    document: subscription,
    variables: {},
    // updateQuery: (prev, { subscriptionData }) => {
    //   console.log('------------>', prev);
    //   console.log('============>', subscriptionData);

    //   if (!subscriptionData.data) return prev;
    //   const newFeedItem = subscriptionData.data.commentAdded;
    //   return Object.assign({}, prev, {
    //     post: {
    //       comments: [newFeedItem, ...prev.post.comments],
    //     },
    //   });
    // },
  });

  const { loading, error, data } = result;

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (data.getMultipleMeasurements.length === 0) return <Chip label="Please select a metric" />;

  const chartData = [];

  // console.log('-=-=-=-=--=-=-=-=-=-=-=-=->', data);

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

  // console.log('....................>', chartData);

  return (
    <>
      <div>CHARTS</div>
      <Chart data={chartData} />
    </>
  );
};

export default Charts;

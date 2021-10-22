import React from 'react';
import { useSelector } from 'react-redux';

import {
  useQuery,
  gql,
} from '@apollo/client';

import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import { selectMetrics } from '../Metrics/metricsSlice';

import Chip from '../../components/Chip';
import Chart from '../Chart/Chart';

const Charts = () => {
  const metrics = useSelector(selectMetrics);
  // console.log('xmmxmxmxmxmxmxmxmxmxmxmxm', metrics);

  // const before = new Date('09/09/2021 00:30:00').getTime();
  // const after = new Date('09/09/2021 00:00:00').getTime();

  // const timeQuery = gql`
  //   query heartBeat{
  //     heartBeat
  //   }
  // `;
  // const timeData = useQuery(timeQuery);
  // console.log('-=-=-=-=-=-=-=-=-=-=-=-=->', timeData);

  // if (timeData.loading) return <LinearProgress />;
  // if (timeData.error) return <Typography color="error">{error}</Typography>;
  // if (timeData.data !== undefined) {
  const after = 1634942247702;
  const before = after + 50000;
  // }

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

  console.log('uiuiuiuiuiuiuiuiui', input);

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

  console.log('afafafafafafafafafafaf', result.data);

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

  console.log('-=-=-=-=--=-=-=-=-=-=-=-=->', data);

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

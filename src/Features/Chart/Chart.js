import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const Chart = ({ data }) => (
  <ResponsiveContainer width="90%" height="80%">
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />

      {data[0].injValveOpen !== undefined
        && (
          <YAxis
            allowDataOverflow
            label={{ value: '%', position: 'bottom' }}
            type="number"
            yAxisId="1"
          />
        )}

      { (data[0].casingPressure !== undefined || data[0].tubingPressure !== undefined)
        && (
          <YAxis
            allowDataOverflow
            label={{ value: 'PSI', position: 'bottom' }}
            type="number"
            yAxisId="2"
          />
        )}

      { (data[0].flareTemp !== undefined || data[0].oilTemp !== undefined
        || data[0].waterTemp !== undefined)
        && (
          <YAxis
            allowDataOverflow
            label={{ value: 'F', position: 'bottom' }}
            type="number"
            yAxisId="3"
          />
        )}

      <Tooltip />
      <Legend />

      {data[0].injValveOpen !== undefined
        && (
          <Line
            yAxisId="1"
            type="monotone"
            dataKey="injValveOpen"
            dot={false}
            isAnimationActive={false}
            stroke="#3352FD"
          />
        )}

      {data[0].casingPressure !== undefined
        && (
          <Line
            yAxisId="2"
            type="monotone"
            dataKey="casingPressure"
            dot={false}
            isAnimationActive={false}
            stroke="#DC143C"
          />
        )}

      {data[0].tubingPressure !== undefined
        && (
          <Line
            yAxisId="2"
            type="monotone"
            dataKey="tubingPressure"
            dot={false}
            isAnimationActive={false}
            stroke="#8B008B"
          />
        )}

      {data[0].flareTemp !== undefined
        && (
          <Line
            yAxisId="3"
            type="monotone"
            dataKey="flareTemp"
            dot={false}
            isAnimationActive={false}
            stroke="#FF8C00"
          />
        )}

      {data[0].oilTemp !== undefined
        && (
          <Line
            yAxisId="3"
            type="monotone"
            dataKey="oilTemp"
            dot={false}
            isAnimationActive={false}
            stroke="#00BFFF"
          />
        )}

      {data[0].waterTemp !== undefined
        && (
          <Line
            yAxisId="3"
            type="monotone"
            dataKey="waterTemp"
            dot={false}
            isAnimationActive={false}
            stroke="#008000"
          />
        )}

    </LineChart>
  </ResponsiveContainer>
);

export default Chart;

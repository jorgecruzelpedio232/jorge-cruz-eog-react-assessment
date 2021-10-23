import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

export default class Chart extends PureComponent {
  render() {
    const { data } = this.props;
    return (
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
          <YAxis />
          <Tooltip />
          <Legend />
          {data[0].casingPressure !== undefined
            && <Line type="monotone" dataKey="casingPressure" dot={false} stroke="#DC143C" />}
          {data[0].injValveOpen !== undefined
            && <Line type="monotone" dataKey="injValveOpen" dot={false} stroke="#3352FD" />}
          {data[0].tubingPressure !== undefined
            && <Line type="monotone" dataKey="tubingPressure" dot={false} stroke="#8B008B" />}
          {data[0].flareTemp !== undefined
            && <Line type="monotone" dataKey="flareTemp" dot={false} stroke="#FF8C00" />}
          {data[0].oilTemp !== undefined
            && <Line type="monotone" dataKey="oilTemp" dot={false} stroke="#00BFFF" />}
          {data[0].waterTemp !== undefined
            && <Line type="monotone" dataKey="waterTemp" dot={false} stroke="#008000" />}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

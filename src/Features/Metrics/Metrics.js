import React from 'react';
import { useSelector } from 'react-redux';

// import {
//   useQuery,
//   gql,
// } from '@apollo/client';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import { Typography } from '@material-ui/core';
// import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core//FormControl';
import Select from '@material-ui/core/Select';
import Chip from '../../components/Chip';
import { selectMetrics } from './metricsSlice';

const Metrics = () => {
  const metrics = useSelector(selectMetrics);
  const names = metrics.map(metric => metric.metric);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // function getStyles(name, metricName, theme) {
  //   return {
  //     fontWeight:
  //       metricName.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium,
  //   };
  // }

  // const { loading, error, data } = useQuery(metricsQuery, {
  //   variables: {},
  // });

  // if (loading) return <LinearProgress />;
  // if (error) return <Typography color="error">{error}</Typography>;
  // if (!data) return <Chip label="Metrics not found" />;

  // console.log(data);

  // const theme = useTheme();
  const [metricName, setMetricName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMetricName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-chip-label">Metrics</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={metricName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {selected.map((value) => (
                <Chip key={value} label={`${value}-------`} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              // style={getStyles(name, metricName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Metrics;

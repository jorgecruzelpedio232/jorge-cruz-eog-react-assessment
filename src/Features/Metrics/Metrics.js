import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { Typography } from '@material-ui/core';
// import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core//FormControl';
import Select from '@material-ui/core/Select';
import Chip from '../../components/Chip';
import { selectMetrics, toggleMetric } from './metricsSlice';
import { selectLastMeasurements } from '../Charts/ChartsSlice';

const Metrics = () => {
  const dispatch = useDispatch();
  const metrics = useSelector(selectMetrics);
  const lastMeasurements = useSelector(selectLastMeasurements);
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

  // const theme = useTheme();
  const [metricName, setMetricName] = React.useState([]);

  const handleChange = (event) => {
    const { target: { value } } = event;
    setMetricName(
      typeof value === 'string' ? value.split(',') : value,
    );
    dispatch(toggleMetric(value));
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
                <Chip key={value} label={`${value} - ${lastMeasurements[value]}`} />
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

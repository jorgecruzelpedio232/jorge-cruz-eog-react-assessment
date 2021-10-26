import { gql } from '@apollo/client';

export const MEASUREMENTS_QUERY = gql`
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

export const MEASUREMENTS_SUBSCRIPTION = gql`
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
      }  
    }
`;

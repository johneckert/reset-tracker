import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useData() {

  const [green, setGreen] = useState([]);
  const [yellowgreen, setYellowGreen] = useState([]);
  const [yellow, setYellow] = useState([]);
  const [orange, setOrange] = useState([]);
  const [red, setRed] = useState([]);
  const [data, setData] = useState([green, yellowgreen, yellow, orange, red]);

  const tables = ['Green', 'Yellowgreen', 'Yellow', 'Orange', 'Red'];

  useEffect(() => {
    setData([green, yellowgreen, yellow, orange, red]);
  }, [green, yellowgreen, yellow, orange, red]);
  
  const getData = async () => {
    tables.map(async (table) => {
      return axios.get(`/${table}`).then(res => {
        switch(table) {
          case 'Green':
            setGreen(res.data.records);
            break;
          case 'Yellowgreen':
            setYellowGreen(res.data.records);
            break;
          case 'Yellow':
            setYellow(res.data.records);
            break;
          case 'Orange':
            setOrange(res.data.records);
            break;
          case 'Red':
            setRed(res.data.records);
            break;
          default:
            break;
        }
      }).catch(err => console.log(err));
    });
  };
  return {
    getData,
    data
  };
};
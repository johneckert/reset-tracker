import { useEffect, useState } from 'react';
import axios from 'axios';
import { tables } from '../constants';

export default function useData(catagory: string) {

  const [green, setGreen] = useState([]);
  const [yellowgreen, setYellowGreen] = useState([]);
  const [yellow, setYellow] = useState([]);
  const [orange, setOrange] = useState([]);
  const [red, setRed] = useState([]);

  // useEffect(() => {
  //   setData([green, yellowgreen, yellow, orange, red]);
  // }, [green, yellowgreen, yellow, orange, red]);
  
  const getData = async (catagory: string) => {
    return axios.get(`/${catagory}`).then(res => {
      switch(catagory) {
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
  };

  switch(catagory) {
    case 'Green':
      return {
        getData,
        data: green
      };
    case 'Yellowgreen':
      return {
        getData,
        data: yellowgreen,
      };
    case 'Yellow':
      return {
        getData,
        data: yellow,
      };
    case 'Orange':
      return {
        getData,
        data: orange,
      };
    case 'Red':
      return {
        getData,
        data: red,
      };
    default:
      return {
        getData,
        data: [],
      };
  }
};
import { useState } from 'react';
import axios from 'axios';

interface Data {
  id: string;
  fields: {
    Date: string;
  }
}

interface Green extends Data {
  fields: {
    Date: string;
  }
}

export default function useData(catagory: string) {

  const [green, setGreen] = useState<any[]>([]);
  const [yellowGreen, setYellowGreen] = useState<any[]>([]);
  const [yellow, setYellow] = useState<any[]>([]);
  const [orange, setOrange] = useState<any[]>([]);
  const [red, setRed] = useState<any[]>([]);
  
  const getData = async (catagory: string) => {
    // swap this for just airtable api?
    return axios.get(`/${catagory}`).then(res => {
      switch(catagory) {
        case 'Green':
          setGreen(res.data.records);
          break;
        case 'YellowGreen':
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
    case 'YellowGreen':
      return {
        getData,
        data: yellowGreen,
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
        data: red,
      };
  }
};
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Airtable from 'airtable';
import axios from 'axios';
import {BASE_ID, API_KEY} from './ENV';

//create a new Airtable object in React
new Airtable({ apiKey: API_KEY }).base(BASE_ID);
//base endpoint to call with each request
axios.defaults.baseURL = `https://api.airtable.com/v0/${BASE_ID}/`;
//content type to send with all POST requests
axios.defaults.headers.post["Content-Type"] = "application/json";
//authenticate to the base with the API key
axios.defaults.headers["Authorization"] = `Bearer ${API_KEY}`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

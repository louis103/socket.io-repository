/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SingleTracking from "./SingleTracking";

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    {/* <Router>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/:deviceId' element={<SingleTracking />} />
      </Routes>
    </Router> */}
  </React.StrictMode>
);


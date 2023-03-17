import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import LogoutLoad from './components/lib/LogoutLoad';  
//import './index.css';
//import './assets/libs/magnific-popup/magnific-popup.css';
//import './assets/libs/owl.carousel/assets/owl.carousel.min.css';
//import './assets/libs/owl.carousel/assets/owl.theme.default.min.css';
//import './assets/css/bootstrap-dark.min.css';
//import './assets/css/bootstrap.min.css';
//import './assets/css/icons.min.css';
//import './assets/css/app-dark.min.css';
//import './assets/css/app.min.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

import Login from './components/Login';
import BaseN from './components/BaseN';
import Home from './components/Home';
import NotFound from './NotFound';

import { BrowserRouter, Routes, Route} from "react-router-dom";
console.log('Ejecutando index ....');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/*<App/>*/}
      <BrowserRouter>
        <Routes>
          {/*<Route path="/" element={<Home />*/}
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<LogoutLoad />} />          
          <Route path="base" element={<BaseN />} />
          {/*<Route path="home" element={<Home />} />*/}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
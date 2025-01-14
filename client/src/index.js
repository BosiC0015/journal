import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cover from './Cover';
import App from './App';
import TrackerPage from './components/Tracker/TrackerPage';
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login"
import Diary from "./components/Diary/Diary"
import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Cover />} />
      <Route path='/agenda' element={<App />} />
      <Route path='/tracker' element={<TrackerPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/diary" element={<Diary />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

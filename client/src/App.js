
import './App.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'


import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker';
import {React,useState} from 'react';
import NavBar from './component/NavBar/NavBar';

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})


  const events = [
    {
      title: "Big Meeting",
      allDay:true,
      start: new Date(2021,6,0),
      end: new Date(2021,6,0)

    },
    {
      title: "Vacation",
      start: new Date(2021,6,0),
      end: new Date(2021,6,0)

    },
    {
      title: "Conference",
      start: new Date(2021,6,0),
      end: new Date(2021,6,0)

    }
  ]

function App() {
  
  return (
    <div className="App">
      <NavBar />
      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
     
      <header className="App-header">
        <h1>This is our Final Project</h1>
      </header>
    </div>
  );
}

export default App;

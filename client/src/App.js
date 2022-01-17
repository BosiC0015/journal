
import './App.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
      start: new Date(2022,2,0),
      end: new Date(2022,2,0)

    },
    {
      title: "Vacation",
      start: new Date(2022,1,7),
      end: new Date(2022,1,10)

    },
    {
      title: "Conference",
      start: new Date(2022,6,20),
      end: new Date(2022,6,23)

    }
  ]

function App() {
  const [newEvent, setNewEvent] = useState({title:"",start:"",end:""});
  const [allEvents, setallEvents] = useState(events);

  function handleAddEvent() {
    setallEvents([...allEvents, newEvent])
  }
  return (
    <div className="App">
      <NavBar />
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input type="text" placeholder='Add Title' style={{width: '20%', margin: "10px"}} value={newEvent.title}
        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}/>
      </div>
      <DatePicker placeholderText='Start Date' style={{marginRight:'10px'}} selected={newEvent.start}
      onChange={(start) => setNewEvent({...newEvent, start})}/>
       <DatePicker placeholderText='End Date' selected={newEvent.end}
      onChange={(end) => setNewEvent({...newEvent, end})}/>
      <button style={{marginTop: "10px"}} onClick={handleAddEvent}>
        Add Event
      </button>
      <Calendar
      localizer={localizer}
      events={allEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500, margin: "50px" }}
    />
    </div>
  );
}

export default App;

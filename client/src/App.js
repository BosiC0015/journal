
import './App.css';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
 import { INITIAL_EVENTS, createEventId,handleDateClick, renderEventContent, renderSidebar, handleWeekendsToggle, handleDateSelect, handleEventClick, handleEvents, renderSidebarEvent } from './event-utils'


// import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
// import format from 'date-fns/format'
// import parse from 'date-fns/parse'
// import startOfWeek from 'date-fns/startOfWeek'
// import getDay from 'date-fns/getDay'
// import enUS from 'date-fns/locale/en-US';
// import 'react-big-calendar/lib/css/react-big-calendar.css'
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { React, useState } from 'react';
 import NavBar from './components/NavBar/NavBar';

// const locales = {
//   'en-US': enUS,
// }

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// })


// const events = [
//   {
//     title: "Big Meeting",
//     allDay: true,
//     start: new Date(2022, 2, 0),
//     end: new Date(2022, 2, 0)

//   },
//   {
//     title: "Vacation",
//     start: new Date(2022, 1, 7),
//     end: new Date(2022, 1, 10)

//   },
//   {
//     title: "Conference",
//     start: new Date(2022, 6, 20),
//     end: new Date(2022, 6, 23)

//   }
// ]

function App() {
  
   let state = {
    weekendsVisible: true,
    currentEvents: []
  }
  
  // const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  // const [allEvents, setallEvents] = useState(events);

  // function handleAddEvent() {
  //   setallEvents([...allEvents, newEvent])
  // }

  
  return (
    <div className="App">
      <NavBar />
      
     
      {/* <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input type="text" placeholder='Add Title' style={{ width: '20%', margin: "10px" }} value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
      </div>
      <DatePicker placeholderText='Start Date' style={{ marginRight: '10px' }} selected={newEvent.start}
        onChange={(start) => setNewEvent({ ...newEvent, start })} />
      <DatePicker placeholderText='End Date' selected={newEvent.end}
        onChange={(end) => setNewEvent({ ...newEvent, end })} />
      <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
        Add Event
      </button>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      /> */}

<div className='demo-app-main'>
<FullCalendar
  plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
  headerToolbar={{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  }}
  dateClick = {handleDateClick} // bind with an arrow function
    
  //eventContent={renderEventContent}

  //{this.handleDateClick}

  initialView="dayGridMonth"
  editable={true}
  selectable={true}
  selectMirror={true}
  dayMaxEvents={true}
  weekends={false}
  //weekends={this.state.weekendsVisible}
  initialEvents={INITIAL_EVENTS}
  events={[
    { title: 'event 1', date: '2022-01-01' },
    { title: 'event 2', date: '2022-04-02' }
  ]}

  select={handleDateSelect}
 
/>
        </div>
    </div>
  );

}




export default App;


import './App.css';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import { sliceEvents, createPlugin } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import RenderSidebar from './components/RenderSidebar.js'

import { INITIAL_EVENTS, createEventId, handleDateClick, renderEventContent, handleWeekendsToggle, handleDateSelect, handleEventClick, handleEvents } from './event-utils'

import NavBar from './components/NavBar/NavBar';

function App() {

  let state = {
    weekendsVisible: true,
    currentEvents: []
  }
  return (
    <div className="App">

      <NavBar />
      <div className='demo-app'>
        <RenderSidebar />

        <div className='demo-app-main'>
          <FullCalendar
            style={{ height: 300, margin: "30px" }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            dateClick={handleDateClick} // bind with an arrow function
            eventContent={renderEventContent}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={state.weekendsVisible}
            initialEvents={INITIAL_EVENTS}
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
          //eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
*/
          />
        </div>
      </div>
    </div>
  );

}


export default App;

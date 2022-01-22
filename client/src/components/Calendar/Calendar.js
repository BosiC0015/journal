
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId, handleDateClick, renderEventContent, handleWeekendsToggle, handleDateSelect, handleEventClick, handleEvents } from './event-utils'

import useApplicationData from '../../hooks/useApplicationData'

export default function Calendar() {
  const { state } = useApplicationData();


  return (
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
    eventRemove={function(){}}*/
    />
  );
};
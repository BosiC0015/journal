
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, initialized, createEventId, handleDateClick, renderEventContent, handleWeekendsToggle, handleDateSelect, handleEventClick, handleEvents } from './event-utils'

export default function Create(props) {
  // Call addPlan() when user click the grid
  const onAdd = (email, title, start, end, allDay) => {
    props.addPlan(email, title, start, end, allDay)
      .then(() => {
        alert('Successfully Added');
      })
      .catch(err => {
        alert(`${err}`);
      });
  };

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
      weekends={props.weekendsVisible}
      //initialEvents={INITIAL_EVENTS}
      select={handleDateSelect}
      eventContent={renderEventContent} // custom render function
      eventClick={handleEventClick}
      eventAdd={(e) => onAdd(props.email,
        e.event.title,
        e.event.start,
        e.event.end,
        e.event.allDay)}
    //eventsSet={this.handleEvents}
    // called after events are initialized/added/changed/removed
    /* you can update a remote database when these fire:
    eventChange={function(){}}
    eventRemove={function(){}}*/
    />
  );
}
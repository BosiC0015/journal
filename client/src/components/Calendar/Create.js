
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; import { INITIAL_EVENTS, initialized, createEventId, handleDateClick, renderEventContent, handleWeekendsToggle, handleDateSelect, handleEventClick, handleEvents } from './event-utils'

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
      //style={{ height: 300, margin: "30px" }}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      eventContent={props.renderEventContent}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={props.weekendsVisible}
      initialEvents={props.events}
      select={props.handleDateSelect}
      eventClick={props.handleEventClick}
      eventAdd={(e) =>
        onAdd(props.email,
          e.event.title,
          e.event.start,
          e.event.end,
          e.event.allDay)
      }
    />
  );
}
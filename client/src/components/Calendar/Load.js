import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


export default function Load(props) {
  // Call addPlan() when user click the grid
  const onAdd = (email, title, start, end, allDay) => {
    props.addPlan(email, title, start, end, allDay)
      .then(() => {
        window.location.reload();
        alert('Successfully Added');
      })
      .catch(err => {
        alert(`${err}`);
      });
  };
  // Call updatePlan() when user drag and drop the event
  const onChange = (id, title, start, end, allDay) => {
    props.updatePlan(id, title, start, end, allDay)
      .then(() => {
        alert('Successfully Updated');
      })
      .catch(err => {
        alert(`${err}`);
      });
  };
  // Call deletePlan() when user click the event
  const onDelete = (id) => {
    props.deletePlan(id)
      .then(() => {
        alert('Successfully Deleted');
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
      eventRemove={(e) => onDelete(e.event.id)}
      eventChange={(e) =>
        onChange(e.event.id,
          e.event.title,
          e.event.start,
          e.event.end,
          e.event.allDay)
      }
    />
  );
}
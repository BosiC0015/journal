
import { getCalendarEvents, getCalendarDiaries } from '../../helpers/selectors';
import { useNavigate } from "react-router-dom";
import useUserData from '../../hooks/useUserData'
import usePlansData from '../../hooks/usePlansData';
import useDiariesData from "../../hooks/useDiariesData";
import Create from './Create';
import Load from './Load';

export default function Calendar() {
  const navigate = useNavigate();
  const { userState } = useUserData();
  const { diaryState, deleteDiary } = useDiariesData();
  const { planState, addPlan, deletePlan, updatePlan } = usePlansData();

  function handleEventClick({ event, el }) {
    // Double Click Event
    el.ondblclick = (() => {
      // Handle Plan Item
      if (event.backgroundColor !== 'orange') {
        if (window.confirm(`Are you sure you want to delete the PLAN: '${event.title}'`)) {
          event.remove();
        }
      }
      else {
        event.editable = false;
        navigate("/diary", {
          state:
          {
            email: userState.user.email,
            id: event.id,
            title: event.title,
            content: event.extendedProps
          }
        });
      }
    });
  };

  function renderEventContent(info) {
    //console.log(info);
    return (
      <>
        <b>{info.timeText}</b>
        {
          info.event.backgroundColor === 'lightblue' &&
          <i>{'PLAN: ' + info.event.title}</i>
        }
        {
          info.event.backgroundColor === 'orange' &&
          <i>{'DIARY: ' + info.event.title}</i>
        }
      </>
    )
  };

  function handleDateSelect(selectInfo) {
    const title = prompt('Please enter a new title for your event')
    const calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection
    if (title && title.replace(/\s/g, '').length) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: 'lightblue'
      })
    }
  };

  const diariesEvents = getCalendarDiaries(diaryState.diaries);
  let events = getCalendarEvents(planState.plans);
  if (!events && diariesEvents) {
    events = diariesEvents;
  }
  else if (events && diariesEvents) {
    events = events.concat(diariesEvents);
  }

  return (
    <main>
      {/* When plans are empty */}
      {!events &&
        <Create
          addPlan={addPlan}
          email={userState.user.email}
          weekendsVisible={planState.weekendsVisible}
          events={events}
          handleEventClick={handleEventClick}
          handleDateSelect={handleDateSelect}
          renderEventContent={renderEventContent}
        />}
      {/* When there are plans exist */}
      {events &&
        <Load
          addPlan={addPlan}
          deletePlan={deletePlan}
          updatePlan={updatePlan}
          email={userState.user.email}
          events={events}
          weekendsVisible={planState.weekendsVisible}
          handleEventClick={handleEventClick}
          handleDateSelect={handleDateSelect}
          renderEventContent={renderEventContent}
        />}
    </main>
  );
};
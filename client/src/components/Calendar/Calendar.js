
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
  const { diaryState } = useDiariesData();
  const { planState, addPlan, deletePlan, updatePlan } = usePlansData();

  let events = getCalendarEvents(planState.plans);
  const diariesEvents = getCalendarDiaries(diaryState.diaries);

  function handleEventClick(clickInfo) {
    const event = clickInfo.event;
    if (event.backgroundColor === 'orange') {
      navigate("/diary");
    }
    else {
      if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
     
    }
  }
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        {
          eventInfo.event.backgroundColor === 'lightblue' &&
          <i>{'PLAN: ' + eventInfo.event.title}</i>
        }
        {
          eventInfo.event.backgroundColor === 'orange' &&
          <i>{'DIARY: ' + eventInfo.event.title}</i>
        }
      </>
    )
  };
  function handleDateSelect(selectInfo) {
    const title = prompt('Please enter a new title for your event')
    const calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection
    if (title.replace(/\s/g, '').length) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: 'lightblue'
      })
    }
    else {
      alert('Error: Title cannot be blank');
    }
  };

  if (!events && diariesEvents) {
    events = diariesEvents;
  }
  else if (events && diariesEvents) {
    events = events.concat(diariesEvents);
  }
  return (
    <main>
      {/* When plans are empty and no diaries */}
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
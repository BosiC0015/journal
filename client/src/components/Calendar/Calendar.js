
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
  const { diaryState, updateDiary, deleteDiary } = useDiariesData();
  const { planState, addPlan, deletePlan, updatePlan } = usePlansData();

  const events = getCalendarEvents(planState.plans);
  const diariesEvents = getCalendarDiaries(diaryState.diaries);

  function handleEventClick(clickInfo) {
    const event = clickInfo.event;
    if (event.backgroundColor === 'orange') {
      navigate("/diary");
    }
    else {
      event.remove();
    }
  }
  function renderEventContent(eventInfo) {
    // console.log(
    //   eventInfo.event.id,
    //   eventInfo.event.title,
    //   eventInfo.event.start,
    //   eventInfo.event.end,
    //   eventInfo.event.allDay
    // );
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

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: 'lightblue'
      })
    }
  };

  return (
    <main>
      {/* When plans are empty and no diaries */}
      {!events && !diariesEvents &&
        <Create
          addPlan={addPlan}
          email={userState.user.email}
          weekendsVisible={planState.weekendsVisible}
          handleEventClick={handleEventClick}
          handleDateSelect={handleDateSelect}
          renderEventContent={renderEventContent}
        />}
      {/* When plans are empty and have diaries */}
      {!events && diariesEvents &&
        <Create
          addPlan={addPlan}
          email={userState.user.email}
          weekendsVisible={planState.weekendsVisible}
          events={diariesEvents}
          updateDiary={updateDiary}
          deleteDiary={deleteDiary}
          handleEventClick={handleEventClick}
          handleDateSelect={handleDateSelect}
          renderEventContent={renderEventContent}
        />}
      {/* When there are plans exist */}
      {events && !diariesEvents &&
        <Load
          addPlan={addPlan}
          deletePlan={deletePlan}
          updatePlan={updatePlan}
          email={userState.user.email}
          events={events}
          weekendsVisible={planState.weekendsVisible}
          deleteDiary={deleteDiary}
          handleEventClick={handleEventClick}
          handleDateSelect={handleDateSelect}
          renderEventContent={renderEventContent}
        />}
      {events && diariesEvents &&
        <Load
          addPlan={addPlan}
          deletePlan={deletePlan}
          updatePlan={updatePlan}
          email={userState.user.email}
          events={events.concat(diariesEvents)}
          weekendsVisible={planState.weekendsVisible}
          deleteDiary={deleteDiary}
          handleEventClick={handleEventClick}
          handleDateSelect={handleDateSelect}
          renderEventContent={renderEventContent}
        />}
    </main>
  );
};
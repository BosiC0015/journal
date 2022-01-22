import { formatDate } from '@fullcalendar/react';

let events = [
  { title: 'event 1', date: '2022-01-01' },
  { title: 'event 2', date: '2022-04-02' }
]

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today


export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}

export function handleDateClick(arg) { // bind with an arrow function
  alert(arg.dateStr)
}


export function renderEventContent(eventInfo) {
  // console.log(
  //   eventInfo.event.title,
  //   eventInfo.event.start,
  //   eventInfo.event.end,
  //   eventInfo.event.allDay
  // );
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}


export function handleWeekendsToggle() {
  this.setState({
    weekendsVisible: !this.state.weekendsVisible
  })
}

export function handleDateSelect(selectInfo) {
  let title = prompt('Please enter a new title for your event')
  let calendarApi = selectInfo.view.calendar

  calendarApi.unselect() // clear date selection

  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })
  }
}

export function handleEventClick(clickInfo) {
  if (`Are you sure you want to delete the event '${clickInfo.event.title}'`) {
    clickInfo.event.remove()
  }
}
let state = {
  weekendsVisible: true,
  currentEvents: []
}
export function handleEvents(events) {
  this.setState({
    currentEvents: events
  })
}


// export function renderSidebarEvent(event) {
// return (
//   <li key={event.id}>
//     <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
//     <i>{event.title}</i>
//   </li>
// )
// }


// export function renderSidebar() {
//   return (
//     <div className='demo-app-sidebar'>
//       <div className='demo-app-sidebar-section'>
//         <h2>Instructions</h2>
//         <ul>
//           <li>Select dates and you will be prompted to create a new event</li>
//           <li>Drag, drop, and resize events</li>
//           <li>Click an event to delete it</li>
//         </ul>
//       </div>
//       <div className='demo-app-sidebar-section'>
//         <label>
//           <input
//             type='checkbox'
//             checked={this.state.weekendsVisible}
//             onChange={this.handleWeekendsToggle}
//           ></input>
//           toggle weekends
//         </label>
//       </div>
//       <div className='demo-app-sidebar-section'>
//         <h2>All Events ({this.state.currentEvents.length})</h2>
//         <ul>
//           {this.state.currentEvents.map(renderSidebarEvent)}
//         </ul>
//       </div>
//     </div>
//   )
// }
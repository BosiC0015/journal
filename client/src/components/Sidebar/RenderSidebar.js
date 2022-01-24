import React from 'react';
import renderSidebarEvent from './RenderSidebarEvent';
import "./sideBar.css";



export default function renderSidebar(props) {
  return (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events (except diaries items)</li>
          <li>Double Click an diary item to edit it</li>
          <li>Double click an event item to delete it</li>
        </ul>
      </div>
      {/*  
       <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={state.weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
    
        <div className='demo-app-sidebar-section'>
           <h2>All Events ({state.currentEvents.length})</h2>
          <ul>
            {state.currentEvents.map(renderSidebarEvent)}
          </ul> 
        </div>   */}
    </div>
  )

};

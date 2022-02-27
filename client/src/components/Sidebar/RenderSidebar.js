import React from 'react';
import { IconContext } from 'react-icons';
import { BsArrowBarLeft } from 'react-icons/bs';
import '../../App.css'


export default function renderSidebar(props) {
  return (
    <div id='sidebar' className='demo-app-sidebar-hide'>
      <IconContext.Provider value={{ id:'show', size: '3em' }}>
        <div className='hide'>
          <BsArrowBarLeft onClick={props.hide} />
        </div>
      </IconContext.Provider>
      <div className='demo-app-sidebar-section'>
        <h2 className='instruction'>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events (except diaries items)</li>
          <li>Double click an diary item to edit it</li>
          <li>Single click an event item to delete it</li>
        </ul>
      </div>
    </div>
  );
};

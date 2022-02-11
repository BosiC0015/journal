import React from 'react';
import $ from 'jquery'
import NavBar from './components/NavBar/NavBar';
import RenderSidebar from './components/Sidebar/RenderSidebar.js';
import Calendar from './components/Calendar/Calendar';
import { IconContext } from 'react-icons';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import './App.css';

function App() {

  const show = () => {
    $('div#sidebar')
      .removeClass('demo-app-sidebar-hide')
      .addClass('demo-app-sidebar-show')
    $('#show').hide();
    $('#hide').show();
  }
  const hide = () => {
    $('div#sidebar')
      .removeClass('demo-app-sidebar-show')
      .addClass('demo-app-sidebar-hide');
    $('#hide').hide();
    $('#show').show();
  }

  
  return (
    <div className="App">
      <NavBar />
      <div className='demo-app'>
        <RenderSidebar hide={hide} />
        <IconContext.Provider value={{ id:'show', size: '3em' }}>
          <div className='show'>
            <BsFillArrowRightSquareFill onClick={show} />
          </div>
        </IconContext.Provider>
        <div className='demo-app-main'>
          <Calendar />
        </div>
      </div>
    </div>
  );

}


export default App;

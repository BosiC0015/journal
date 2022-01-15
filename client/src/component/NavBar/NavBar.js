import React from 'react';
import './NavBar.scss';

export default function NavBar(props) {
  return (
    <div className='nav-bar'>
      <div className='nav-bar__redirect'>
        <ul className='nav-bar__redirect-link'>Today</ul>
        <ul className='nav-bar__redirect-link'>This Week</ul>
        <ul className='nav-bar__redirect-link'>This Month</ul>
        <ul className='nav-bar__redirect-link'>Tracker</ul>
      </div>
      <div className='nav-bar__user'>
        <ul className='nav-bar__user-action'>Log in</ul>
        <ul className='nav-bar__user-action'>Sign up</ul>
      </div>
    </div>
  );
};

import React from 'react';
import TodayButton from './TodayButton';
import ThisWeekButton from './ThisWeekButton';
import ThisMonthButton from './ThisMonthButton';
import TrackerButton from './TrackerButton';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import './NavBar.scss';


export default function NavBar(props) {

  return (
    <div className='nav-bar'>
      <div className='nav-bar__redirect'>
        <ul className='nav-bar__redirect-link'><TodayButton /></ul>
        <ul className='nav-bar__redirect-link'><ThisWeekButton /></ul>
        <ul className='nav-bar__redirect-link'><ThisMonthButton /></ul>
        <ul className='nav-bar__redirect-link'><TrackerButton /></ul>
      </div>
      <div className='nav-bar__user'>
        <ul className='nav-bar__user-action'><LoginButton /></ul>
        <ul className='nav-bar__user-action'>
          <SignupButton
            name='Sign Up'
          />
        </ul>
      </div>
    </div>
  );
};

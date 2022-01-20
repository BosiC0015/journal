import React from 'react';
import TodayButton from './TodayButton';
import ThisWeekButton from './ThisWeekButton';
import ThisMonthButton from './ThisMonthButton';
import TrackerButton from './TrackerButton';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LogoutButton from './LogoutButton';
import './NavBar.scss';
import useApplicationData from "../../hooks/useApplicationData";



export default function NavBar(props) {
  const { state, logout } = useApplicationData();

  return (
    <header className='nav-bar'>
      <div className='nav-bar__redirect'>
        <ul className='nav-bar__redirect-link'><TodayButton /></ul>
        <ul className='nav-bar__redirect-link'><ThisWeekButton /></ul>
        <ul className='nav-bar__redirect-link'><ThisMonthButton /></ul>
        <ul className='nav-bar__redirect-link'><TrackerButton /></ul>
      </div>
      <div className='nav-bar__user'>
        {!state.isLoggedin &&
          <ul className='nav-bar__user-action'>
            <LoginButton name='Login' />
          </ul>
        }
        {!state.isLoggedin &&
          <ul className='nav-bar__user-action'>
            <SignupButton name='Sign Up' />
          </ul>
        }
        {state.isLoggedin &&
          <ul className='nav-bar__user-action'>
            <aside className='welcome__text'>
              Hi {state.user.name}
            </aside>
            <LogoutButton name='Logout' onLogout={logout} />
          </ul>
        }
      </div>
    </header>
  );
};
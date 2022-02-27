import React from 'react';
import TodayButton from './TodayButton';
import TrackerButton from './TrackerButton';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LogoutButton from './LogoutButton';
import DiaryButton from './DiaryButton';
import useUserData from "../../hooks/useUserData";
import './NavBar.scss';



export default function NavBar() {
  const { userState, logout } = useUserData();

  return (
    <header className='nav-bar'>
      <div className='nav-bar__redirect'>
        <ul className='nav-bar__redirect-link'><TodayButton /></ul>
        <ul className='nav-bar__redirect-link'><DiaryButton name='Diary' /></ul>
        <ul className='nav-bar__redirect-link'><TrackerButton /></ul>
      </div>
      <div className='nav-bar__user'>
        {!userState.isLoggedin &&
          <ul className='nav-bar__user-action'>
            <LoginButton name='Login' />
          </ul>
        }
        {!userState.isLoggedin &&
          <ul className='nav-bar__user-action'>
            <SignupButton name='Sign Up' />
          </ul>
        }
        {userState.isLoggedin && 
          <ul className='nav-bar__user-action'>
            <span className='welcome-text'>Hello, {userState.user.name}!</span>
          </ul>
        }
        {userState.isLoggedin &&
          <ul className='nav-bar__user-action'>
            {/* <aside className='welcome__text'>Hi {userState.user.name}</aside> */}
            <LogoutButton name='Logout' onLogout={logout} />
          </ul>
        }
      </div>
    </header>
  );
};
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './components/Button/Button';
import NavBar from './components/NavBar/NavBar';
import './Cover.scss';


export default function Cover() {
  const navigate = useNavigate();

  return (
    <main>
      <NavBar />
      {/* <img className='cover' alt='cover' src='https://images.pexels.com/photos/9177833/pexels-photo-9177833.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' /> */}
      <div className='cover'>
        <div className='home-msg'>
          <h1 className='home-msg'>Welcome to My Tiny Journal</h1>
        </div>
        <div className='login-signup'>
          <div className='please'>
            <h1>Please</h1>
            <Button id='cover-button' onClick={() => navigate('/login')}>Login</Button>
          </div>
          <div className='please'>
            <h1>or</h1>
            <Button id='cover-button' onClick={() => navigate('/signup')}>SignUp</Button>
          </div>
      </div>
      </div>
    </main>
  );
};
import React from 'react';
import Button from '../Button';

export default function LoginButton(props) {
  return (
    <Button onClick={() => console.log("Login")}>Login</Button>
  );
};
import React from 'react';
import Button from '../Button';
import LoginForm from '../Forms/LoginForm';

export default function LoginButton(props) {
  return (
    <Button onClick={() => {
      <LoginForm />;
    }
    }>{props.name}</Button>
  );
};
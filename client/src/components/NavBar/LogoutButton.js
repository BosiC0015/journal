import React from 'react';
import Button from '../Button/Button';
import { useNavigate } from "react-router-dom";

export default function LogoutButton(props) {
  const navigate = useNavigate();
  return (
    <Button onClick={() => {
      props.onLogout();
      navigate("/");
      window.location.reload();
    }}
    >
      {props.name}</Button>
  );
};
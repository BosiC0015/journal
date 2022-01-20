import React from 'react';
import Button from '../Button';
import { useNavigate } from "react-router-dom";

export default function LogoutButton(props) {
  const navigate = useNavigate();
  return (
    <Button onClick={() => {
      props.onLogout();
      navigate("/");
    }}
    >
      {props.name}</Button>
  );
};
import React from 'react';
import Button from '../Button/Button';
import { useNavigate } from "react-router-dom";

export default function LoginButton(props) {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/login")}>{props.name}</Button>
  );
};
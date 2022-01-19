import React from 'react';
import Button from '../Button';
import { useNavigate } from "react-router-dom";

export default function SignupButton(props) {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/signup")}>{props.name}</Button>
  );
};
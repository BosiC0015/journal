import React from 'react';
import Button from '../Button/Button';
import { useNavigate } from "react-router-dom";

export default function DiaryButton(props) {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/diary")}>{props.name}Diary</Button>
  );
};
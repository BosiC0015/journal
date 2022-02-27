import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

export default function TodayButton(props) {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate('/agenda')}>Agenda</Button>
  );
};
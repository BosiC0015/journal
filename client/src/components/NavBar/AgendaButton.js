import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

export default function AgendaButton(props) {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate('/')}>Agenda</Button>
  );
};
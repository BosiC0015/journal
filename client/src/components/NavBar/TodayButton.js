import React from 'react';
import Button from '../Button/Button';

export default function TodayButton(props) {
  return (
    <Button onClick={() => console.log("Today")}>Today</Button>
  );
};
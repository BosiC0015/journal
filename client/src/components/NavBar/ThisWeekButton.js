import React from 'react';
import Button from '../Button';

export default function ThisWeekButton(props) {
  return (
    <Button onClick={() => console.log("This Week")}>This Week</Button>
  );
};
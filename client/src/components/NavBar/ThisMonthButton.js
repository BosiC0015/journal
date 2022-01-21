import React from 'react';
import Button from '../Button/Button';

export default function ThisMonthButton(props) {
  return (
    <Button onClick={() => console.log("This Month")}>This Month</Button>
  );
};
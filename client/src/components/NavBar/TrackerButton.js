import React from 'react';
import Button from '../Button';

export default function TrackerButton(props) {
  return (
    <Button  onClick={() => console.log("Tracker")}>Tracker</Button>
  );
};
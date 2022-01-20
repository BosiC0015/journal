import React from "react";
import './styles.scss';


export default function HabitItem(props) {
  return (
    <button className="habit">{props.name}</button>
  );
};
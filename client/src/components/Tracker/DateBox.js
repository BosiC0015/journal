import React from "react";
import './styles.scss'

export default function DateBox(props) {
  return (
    <div>
      <button className="table__date-box">{props.days}</button>
    </div>
  );
};
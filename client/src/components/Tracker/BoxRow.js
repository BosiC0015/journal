import React from "react";
import './styles.scss';
import TrackerBox from "./TrackerBox";


export default function BoxRow(props) {
  const array = [...Array(props.days).keys()];
  const tracker = array.map((elm) => <TrackerBox key={elm} />);

  return (
    <div className="table__checker">
      { tracker }
    </div>
  );
};
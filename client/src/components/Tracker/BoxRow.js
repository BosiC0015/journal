import React from "react";
import './styles.scss';
import TrackerBox from "./TrackerBox";


export default function BoxRow(props) {
  const array = Array.from({length: props.days}, (_, i) => i + 1);
  const tracker = array.map(elm => 
    <TrackerBox 
      key={elm} 
      status={props.statusObj[elm]} 
      day={elm}
      habit_id={props.habit_id}
      saveAsTrue={props.saveNewStatusAsTrue}
      saveAsFalse={props.saveNewStatusAsFalse}
    />
  );

  
  return (
    <div className="table__checker">
      { tracker }
    </div>
  );
};
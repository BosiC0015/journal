import React from "react";
import DateBox from "./DateBox";
import './styles.scss'


export default function DateList(props) {
  const dayArray = Array.from({length: props.days}, (_, i) => i + 1);

  const dayList = dayArray.map(elm => (
    <DateBox key={elm} days={elm}/>
  ));

  return (
    <section className="table">
      <div className="table__date">
        { dayList }
      </div>
    </section>
  );
};
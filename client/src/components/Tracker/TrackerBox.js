import React, { useState } from "react";
import "./styles.scss";


export default function TrackerBox(props) {
  const [boxClass, setBoxClass] = useState('tracker-box')

  const check = () => {
    if (boxClass === 'tracker-box') {
      setBoxClass('tracker-box__checked');
    } else {
      setBoxClass('tracker-box');
    }
  };

  return (
    <div>
      <button className={boxClass} onClick={check} />
    </div>
  );
};
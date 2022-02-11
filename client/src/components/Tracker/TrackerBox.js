import React from "react";
import useVisualMode from "../../hooks/useVisualMode";
import { useNavigate } from "react-router-dom";
import "./styles.scss";


export default function TrackerBox(props) {
  const NO = "NO";
  const YES = "YES";
  const navigate = useNavigate();
  const { mode, transition } = useVisualMode(
    props.status ? YES : NO
  );

  const click = (day, habit_id) => {
    if (!props.isLoggedin) {
      alert('Please Login an Account');
      navigate("/login");
      return;
    }
    if (mode === NO) {
      props
        .saveAsTrue(props.day, props.habit_id)
        .then(() => transition(YES))
        .catch(err => console.log(err.message))
    } else {
      props
        .saveAsFalse(props.day, props.habit_id)
        .then(() => transition(NO))
        .catch(err => console.log(err.message))
    };
  };


  return (
    <div>
      {mode === NO && <button className='tracker-box' onClick={click} />}
      {mode === YES && <button className='tracker-box__checked' onClick={click} />}
    </div>
  );
};
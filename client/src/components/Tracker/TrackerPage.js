import React, { useState } from "react";
import DateList from "./DateList";
import BoxRow from "./BoxRow";
import HabitItem from "./HabitItem";
import NavBar from "../NavBar/NavBar";
import './styles.scss';
import classNames from "classnames";


const myHabits = [
  'get up before 8.00',
  'sleep before 0.00'
];

const days = 31;
const firstDay = 'Saturday';


export default function TrackerPage(props) {
  const [newHabit, setNewHabit] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


  const save = (newHabit) => {
    myHabits.push(newHabit);
  };

  const clear = (event) => {
    event.target.value = '';
    setErrorMsg('');
  }

  const validate = (newHabit) => {
    if (newHabit === '') {
      setErrorMsg('Your new habit cannot be empty!');
      return;
    }
    setErrorMsg('');
    save(newHabit);
    setNewHabit('');
  };


  const countArray = [...Array(myHabits.length).keys()];

  const habitsList = myHabits.map(elm => (
    <HabitItem key={myHabits.indexOf(elm)} name={elm} />
  ));

  const trackerBoxes = countArray.map((elm) => (
    <BoxRow key={elm} days={days} />
  ));


  return (
    <main>
      <NavBar />
      <div className="main-container">
        <section className="month">
          <h1 className="month__title">January Tracker</h1>
        </section>
        <section className="tracker">
          <div className="tracker__habits-list">
            <HabitItem name="My Habits" />
            {habitsList}
          </div>
          <div className="tracker__checkboxes">
            <DateList days={days} />
            {trackerBoxes}
          </div>
        </section>
        <section className="add-habit">
          <input
            className="add-habit__input"
            placeholder="Add New Habit"
            type="text"
            onFocus={(event) => clear(event)}
            onChange={(event) => setNewHabit(event.target.value)}
          />
          <button className="add-habit__submit" onClick={() => validate(newHabit)}>Save</button>
        </section>
        <section className="validation">{errorMsg}</section>
      </div>
    </main>
  );
};
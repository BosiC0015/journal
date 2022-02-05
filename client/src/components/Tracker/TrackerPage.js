import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import DateList from "./DateList";
import BoxRow from "./BoxRow";
import HabitItem from "./HabitItem";
import Form from "./Form";
import Loading from "./Loading";
import trackerHelpers from "../../helpers/trackerHelpers";
import useUserData from "../../hooks/useUserData";
import moment from "moment";
import './styles.scss';


export default function TrackerPage(props) {
  const { userState } = useUserData();
  const { getMyHabitsArray, getStatusForHabit } = trackerHelpers();
  const [loading, setLoading] = useState(true)

  // set initial state
  const [state, setState] = useState({
    myHabits: [],
    habitsStatus: []
  });
  const setMyHabits = (myHabits) => setState({ ...state, myHabits });
  const setHabitsStatus = (habitsStatus) => setState(prev => ({ ...prev, habitsStatus }));
  // make axios requests to retreive data from server
  useEffect(() => {
    Promise.all([
      axios.get('/api/habits'),
      axios.get('/api/januaryhabits')
    ]).then((all) => {
      setMyHabits([...all[0].data]);
      setHabitsStatus([...all[1].data]);
      setLoading(false);
    })
  }, [])
  // console.log(state);


  const habitsArray = getMyHabitsArray(state);
  const countArray = Array.from({ length: habitsArray.length }, (_, i) => i + 1);

  // save data to db
  const saveNewHabit = (content) => {
    const newHabit = { id: habitsArray.length + 1, content: content, created_at: moment().format('L') }
    // console.log(newHabit)
    return axios
      .post(`/api/habits`, newHabit)
      .then(res => {
        const data = res.data
        //console.log('res:', res)
        const myNewHabits = state.myHabits
        myNewHabits.push(data[0])
        setMyHabits(myNewHabits)
      })
      .catch(err => console.log(err))
  };

  const saveNewStatusAsTrue = (day, habit_id) => {
    const data = { day: day, habit_id: habit_id };
    return axios
      .post(`/api/januaryhabits/true`, data)
      .catch(err => console.log(err.message))
  };

  const saveNewStatusAsFalse = (day, habit_id) => {
    const data = { day: day, habit_id: habit_id };
    return axios
      .post(`/api/januaryhabits/false`, data)
      .catch(err => console.log(err.message))
  };


  // render page components
  const habitsList = habitsArray.map(elm => {
    return (
      <HabitItem key={habitsArray.indexOf(elm)} name={elm} />
    );
  });
  const trackerBoxes = countArray.map((elm) => {
    return (
      <BoxRow
        key={elm}
        habit_id={elm}
        days={31}
        statusObj={getStatusForHabit(state, elm)}
        saveNewStatusAsTrue={saveNewStatusAsTrue}
        saveNewStatusAsFalse={saveNewStatusAsFalse}
        isLoggedin={userState.isLoggedin}
      />
    );
  });


  if (loading) {
    return (
      <Loading />
    );
  };

  return (
    <main>
      <NavBar />
      <div className="main-container">
        <section className="month">
          <span className="month__title">
            <center>January Habit Tracker</center>
          </span>
        </section>
        <section className="tracker">
          <div className="tracker__habits-list">
            <HabitItem name="My Habits" />
            {habitsList}
          </div>
          <div className="tracker__checkboxes">
            <DateList days={31} />
            {trackerBoxes}
          </div>
        </section>
        <Form myHabits={habitsArray}
          onSave={saveNewHabit}
          isLoggedin={userState.isLoggedin} />
      </div>
    </main>
  );
};
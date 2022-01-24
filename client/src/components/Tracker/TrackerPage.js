import React, { useEffect, useState } from "react";
import axios from "axios";
import DateList from "./DateList";
import BoxRow from "./BoxRow";
import HabitItem from "./HabitItem";
import NavBar from "../NavBar/NavBar";
import Form from "./Form";
import Loading from "./Loading";
import trackerHelpers from "../../helpers/trackerHelpers";
import './styles.scss';
import moment from "moment";
import useUserData from "../../hooks/useUserData";


export default function TrackerPage(props) {
  const { getMyHabitsArray, getHabitsForUser, getStatusForHabit } = trackerHelpers();
  const { userState } = useUserData();
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
  console.log(state);

  // helper arrays
  const habitsArray = getMyHabitsArray(state, userState.user.id);
  const habitsForUser = getHabitsForUser(state, userState.user.id);

  // save data to db
  const saveNewHabit = (user_id, content) => {
    const newHabit = { id: state.myHabits.length + 1, user_id: user_id, content: content, created_at: moment().format('L') }
    // console.log(newHabit)
    return axios
      .post(`/api/habits`, newHabit)
      .then(res => {
        console.log('res:', res)
        const data = res.data
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
  const trackerBoxes = habitsForUser.map((elm) => {
    return (
      <BoxRow
        key={elm.habit_id}
        habit_id={elm.habit_id}
        days={31}
        statusObj={getStatusForHabit(state, elm.habit_id)}
        saveNewStatusAsTrue={saveNewStatusAsTrue}
        saveNewStatusAsFalse={saveNewStatusAsFalse}
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
          <h1 className="month__title">January Habit Tracker</h1>
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
        <Form myHabits={habitsArray} user_id={userState.user.id} onSave={saveNewHabit} />
      </div>
    </main>
  );
};
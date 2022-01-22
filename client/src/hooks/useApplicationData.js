import axios from 'axios';

import { updatetDiaryById } from '../helpers/selectors';

import {
  useEffect,
  useReducer
} from 'react';

import dataReducer, {
  SET_USER, SET_DIARIES, SET_PLANS, CLEAR_USER
} from '../reducers/dataReducer';

const useApplicationData = () => {
  // Signup an account by given account info
  async function signup(user) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.post(`http://localhost:3001/api/users`, user)
      .then(res => {
        const data = res.data;
        clearTimeout(timeout);
        if (data.msg) {
          throw new Error(data.msg);
        }
        else if (data.error) {
          throw new Error('Something wrong. Please try again!');
        }
      });
  };
  //
  async function login(email, password) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await Promise.all([
      axios.post(`http://localhost:3001/api/users/${email}`,
        { email, password }),
      axios.get(`http://localhost:3001/api/diaries/${email}`),
      axios.get(`http://localhost:3001/api/plans/${email}`)
    ])
      .then(all => {
        const userData = all[0].data;
        const diaryData = all[1].data;
        const planData = all[2].data;
        clearTimeout(timeout);
        if (userData.error || diaryData.error || planData.error) {
          throw new Error('Something wrong. Please try again!');
        }
        // set all realted data and update login status
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('diaries', JSON.stringify(diaryData));
        localStorage.setItem('plans', JSON.stringify(planData));
        setUserData(userData);
        setDiariesData(diaryData);
        setPlansData(planData);
      });
  };
  //
  async function submitDiary(email, title, content) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.post(`http://localhost:3001/api/diaries/`, { email, title, content })
      .then(res => {
        const data = res.data;
        clearTimeout(timeout);
        if (data.error) {
          throw new Error('Something wrong. Please try again!');
        }
        addUserDiary(data);
      });
  };
  //
  async function updateDiary(email, id, title, content) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.put(`http://localhost:3001/api/diaries/`, { email, id, title, content })
      .then(res => {
        const data = res.data;
        clearTimeout(timeout);
        if (data.error) {
          throw new Error('Something wrong. Please try again!');
        }
        updateUserDiary(data);
      });
  };
  //
  async function addPlan(email, title) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.post(`http://localhost:3001/api/plans/`, { email, title })
      .then(res => {
        const data = res.data;
        clearTimeout(timeout);
        if (data.error) {
          throw new Error('Something wrong. Please try again!');
        }
        addUserPlan(data);
      });
  };
  //
  function addUserDiary(diary) {
    // Copy of current user diaries
    let diaries = [...state.diaries];
    // Add new diary to the copy
    diaries.push(diary);
    // Update cookie and current diary data
    localStorage.setItem('diaries', JSON.stringify(diaries));
    setDiariesData(diaries);
  };
  //
  function updateUserDiary(diary) {
    // Copy of current user diaries
    let diaries = [...state.diaries];
    // Update the copy of diaries
    diaries = updatetDiaryById(diaries, diary);
    // Update cookie and current diary data
    localStorage.setItem('diaries', JSON.stringify(diaries));
    setDiariesData(diaries);
  };
  //
  function addUserPlan(plan) {
    // Copy of current user plans
    let plans = [...state.plans];
    // Add new plan to the copy
    plans.push(plan);
    // Update cookie and current plan data
    localStorage.setItem('plans', JSON.stringify(plans));
    setPlansData(plans);
  };
  //
  function logout() {
    dispatch({
      type: CLEAR_USER,
      user: {},
      diaries: [],
      plans: [],
      isLoggedin: false,
      weekendsVisible: true
    });
    localStorage.clear();
  };
  //
  function setUserData(userData) {
    dispatch({
      type: SET_USER,
      user: userData,
      isLoggedin: true
    })
  };
  //
  function setDiariesData(diariesData) {
    dispatch({
      type: SET_DIARIES,
      diaries: diariesData
    })
  };
  //
  function setPlansData(plansData) {
    dispatch({
      type: SET_PLANS,
      plans: plansData
    })
  };

  //
  const [state, dispatch] = useReducer(dataReducer, {
    user: {},
    diaries: [],
    plans: [],
    isLoggedin: false,
    weekendsVisible: true
  });
  //
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const diaries = localStorage.getItem("diaries");
      const plans = localStorage.getItem("plans");
      setUserData(JSON.parse(user));
      setDiariesData(JSON.parse(diaries));
      setPlansData(JSON.parse(plans));
    }
  }, []);

  //console.log(state.user, state.diaries, state.plans, state.isLoggedin);
  return { state, signup, login, logout, submitDiary, updateDiary, addPlan }
};

export default useApplicationData;
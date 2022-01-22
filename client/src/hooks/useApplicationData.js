import axios from 'axios';

import { updatetItemsById, deleteItemsById } from '../helpers/selectors';

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
        if (userData.msg) {
          throw new Error(userData.msg);
        }
        else if (userData.error ||
          diaryData.error ||
          planData.error) {
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
  async function updateDiary(id, title, content) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.put(`http://localhost:3001/api/diaries/`, { id, title, content })
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
  async function deleteDiary(id) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.delete(`http://localhost:3001/api/diaries/${id}`)
      .then(res => {
        const data = res.data;
        clearTimeout(timeout);
        if (!data) {
          throw new Error('Cannot Delete the Removed Item!');
        }
        else if (data.error) {
          console.log(data.error);
          throw new Error('Something wrong. Please try again!');
        }
        deleteUserDiary(data);
      });
  };
  //
  async function addPlan(email, title, start, end, allDay) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.post(`http://localhost:3001/api/plans/`, { email, title, start, end, allDay })
      .then(res => {
        const data = res.data;
        clearTimeout(timeout);
        if (data.error) {
          console.log(data.error);
          throw new Error('Something wrong. Please try again!');
        }
        addUserPlan(data);
      });
  };
  //
  async function updatePlan(id, title, start, end, allDay) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.put(`http://localhost:3001/api/plans/`, { id, title, start, end, allDay })
      .then(res => {
        const data = res.data;
        clearTimeout(timeout);
        if (data.error) {
          throw new Error('Something wrong. Please try again!');
        }
        updateUserPlan(data);
      });
  };
  //
  async function deletePlan(id) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.delete(`http://localhost:3001/api/plans/${id}`)
      .then(res => {
        const data = res.data;
        clearTimeout(timeout);
        if (!data) {
          throw new Error('Cannot Delete the Removed Item!');
        }
        else if (data.error) {
          throw new Error('Something wrong. Please try again!');
        }
        deleteUserPlan(data);
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
    diaries = updatetItemsById(diaries, diary);
    // Update cookie and current diary data
    localStorage.setItem('diaries', JSON.stringify(diaries));
    setDiariesData(diaries);
  };
  //
  function deleteUserDiary(diary) {
    // Copy of current user diaries
    let diaries = [...state.diaries];
    // Update the copy of diaries
    diaries = deleteItemsById(diaries, diary);
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
  function updateUserPlan(plan) {
    // Copy of current user diaries
    let plans = [...state.plans];
    // Update the copy of plans
    plans = updatetItemsById(plans, plan);
    // Update cookie and current plan data
    localStorage.setItem('plans', JSON.stringify(plans));
    setPlansData(plans);
  };
  //
  function deleteUserPlan(plan) {
    // Copy of current user diaries
    let plans = [...state.plans];
    // Update the copy of plans
    plans = deleteItemsById(plans, plan);
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
  return { state, signup, login, logout, submitDiary, updateDiary, deleteDiary, addPlan, deletePlan, updatePlan }
};

export default useApplicationData;
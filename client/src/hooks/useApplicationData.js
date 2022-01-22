import axios from 'axios';
import { updatetItemsById, deleteItemsById } from '../helpers/selectors';
import { useEffect, useReducer } from 'react';
import dataReducer,
{ SET_USER, SET_DIARIES, SET_PLANS, CLEAR_USER }
  from '../reducers/dataReducer';

const useApplicationData = () => {
  // Signup an account by given an user object
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

  // Login an account and retrieve account data
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
      // handle response
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

  // Create a diary for an user
  async function submitDiary(email, title, content) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.post(`http://localhost:3001/api/diaries/`, { email, title, content })
      // handle response
      .then(res => {
        const data = res.data;
        clearTimeout(timeout);
        if (data.error) {
          throw new Error('Something wrong. Please try again!');
        }
        addUserDiary(data);
      });
  };

  // Update a existed diary for an user
  async function updateDiary(id, title, content) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.put(`http://localhost:3001/api/diaries/`, { id, title, content })
      // handle response
      .then(res => {
        const data = res.data;
        clearTimeout(timeout);
        if (data.error) {
          throw new Error('Something wrong. Please try again!');
        }
        updateUserDiary(data);
      });
  };

  // Delete a existed diary for an user
  async function deleteDiary(id) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.delete(`http://localhost:3001/api/diaries/${id}`)
      // handle response
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

  // Create a plan for an user
  async function addPlan(email, title, start, end, allDay) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.post(`http://localhost:3001/api/plans/`, { email, title, start, end, allDay })
      // handle response
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

  // Update a existed plan for an user
  async function updatePlan(id, title, start, end, allDay) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.put(`http://localhost:3001/api/plans/`, { id, title, start, end, allDay })
      // handle response
      .then(res => {
        const data = res.data;
        clearTimeout(timeout);
        if (data.error) {
          throw new Error('Something wrong. Please try again!');
        }
        updateUserPlan(data);
      });
  };

  // Delete a existed plan for an user
  async function deletePlan(id) {
    const timeout = setTimeout(() => {
      alert("Cannot Connect to the Server");
    }, 2000);
    return await axios.delete(`http://localhost:3001/api/plans/${id}`)
      // handle response
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


  // Add new diary to local data and cookie
  function addUserDiary(diary) {
    // Copy of current user diaries
    let diaries = [...state.diaries];
    // Add new diary to the copy
    diaries.push(diary);
    // Update cookie and current diary data
    localStorage.setItem('diaries', JSON.stringify(diaries));
    setDiariesData(diaries);
  };

  // Update existed local diaries data and cookie
  function updateUserDiary(diary) {
    // Copy of current user diaries
    let diaries = [...state.diaries];
    // Update the copy of diaries
    diaries = updatetItemsById(diaries, diary);
    // Update cookie and current diary data
    localStorage.setItem('diaries', JSON.stringify(diaries));
    setDiariesData(diaries);
  };

  // Delete and update existed local diaries data and cookie
  function deleteUserDiary(diary) {
    // Copy of current user diaries
    let diaries = [...state.diaries];
    // Update the copy of diaries
    diaries = deleteItemsById(diaries, diary);
    // Update cookie and current diary data
    localStorage.setItem('diaries', JSON.stringify(diaries));
    setDiariesData(diaries);
  };

  // Add new plan to local data and cookie
  function addUserPlan(plan) {
    // Copy of current user plans
    let plans = [...state.plans];
    // Add new plan to the copy
    plans.push(plan);
    // Update cookie and current plan data
    localStorage.setItem('plans', JSON.stringify(plans));
    setPlansData(plans);
  };

  // Update existed local plans data and cookie
  function updateUserPlan(plan) {
    // Copy of current user diaries
    let plans = [...state.plans];
    // Update the copy of plans
    plans = updatetItemsById(plans, plan);
    // Update cookie and current plan data
    localStorage.setItem('plans', JSON.stringify(plans));
    setPlansData(plans);
  };

  // Delete and update existed local plans data and cookie
  function deleteUserPlan(plan) {
    // Copy of current user diaries
    let plans = [...state.plans];
    // Update the copy of plans
    plans = deleteItemsById(plans, plan);
    // Update cookie and current plan data
    localStorage.setItem('plans', JSON.stringify(plans));
    setPlansData(plans);
  };

  // Reset local data and cookie when user logout
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

  // Call for set user data
  function setUserData(userData) {
    dispatch({
      type: SET_USER,
      user: userData,
      isLoggedin: true
    })
  };

  // Call for set diaries data
  function setDiariesData(diariesData) {
    dispatch({
      type: SET_DIARIES,
      diaries: diariesData
    })
  };

  // Call for set plans data
  function setPlansData(plansData) {
    dispatch({
      type: SET_PLANS,
      plans: plansData
    })
  };

  // Initialize necessary states
  const [state, dispatch] = useReducer(dataReducer, {
    user: {},
    diaries: [],
    plans: [],
    isLoggedin: false,
    weekendsVisible: true
  });

  // Get data from cookie when page refreshs
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
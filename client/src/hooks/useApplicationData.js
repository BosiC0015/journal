import axios from 'axios';

import {
  useEffect,
  useReducer
} from 'react';

import dataReducer, {
  SET_USER
} from '../reducers/dataReducer';

const useApplicationData = () => {
  // Signup an account by given account info
  async function signup(user) {
    const timeout = setTimeout(() => {
      console.log("Cannot Connect to the Server");
    }, 2000)
    return await axios.post(`http://localhost:3001/api/users`, user)
      .then((res) => {
        const data = res.data;
        clearTimeout(timeout);
        if (data.msg) {
          throw new Error(data.msg);
        }
        else if (data.error) {
          throw new Error('Something wrong. Please try again!');
        }
      })
    // .catch(err => {
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err
    //   })
    // }
    // );
  };

  //
  async function login(email, password) {
    return await axios.post(`http://localhost:3001/api/users/${email}`, { email, password })
      .then((res) => {
        const data = res.data
        if (data.msg) {
          throw new Error(data.msg);
        }
        else if (data.error) {
          throw new Error('Something wrong. Please try again!');
        }
        else {
          // set current user and update login status
          localStorage.setItem('Token', JSON.stringify(data));
          setCurrentUser(data);
          // transition(HOME);
        }
      })
  };

  //
  async function submitDiary(email, title, content) {
    return await axios.post(`http://localhost:3001/api/diaries/${email}`, { email, title, content })
  };

  //
  function logout() {
    dispatch({
      type: SET_USER,
      user: {},
      isLoggedin: false
    });
    localStorage.clear();
  };

  //
  function setCurrentUser(data) {
    dispatch({
      type: SET_USER,
      user: data,
      isLoggedin: true
    })
  };

  const [state, dispatch] = useReducer(dataReducer, {
    user: {},
    isLoggedin: false,
    payload: ''
  });

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setCurrentUser(JSON.parse(token));
    }
  }, []);

  //console.log(state.user, state.isLoggedin);
  return { state, signup, login, logout, submitDiary }
};

export default useApplicationData;
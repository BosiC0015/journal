import axios from 'axios';

import {
  useEffect,
  useReducer
} from 'react';

import dataReducer, {
  SET_USER,
  GET_ERRORS
} from '../reducers/dataReducer';

const useApplicationData = () => {

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: '/api/users',
  //   })
  //     .then(({
  //       data
  //     }) => {
  //       console.log(data);
  //       dispatch({
  //         type: SET_USERS,
  //         users: data
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // return {
  //   state,
  //   dispatch
  // };

  // Signup an account by given account info
  async function signup(user) {
    return await axios.post(`http://localhost:3001/api/users`, user)
      .then((res) => {
        const data = res.data
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

  async function login(pair) {
    return await axios.post(`http://localhost:3001/api/users/${pair.email}`, pair)
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

  function logout() {
    dispatch({
      type: SET_USER,
      user: {}
    });
    localStorage.clear();
  };

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

  console.log(state.user, state.isLoggedin);
  return { state, signup, login, logout }
};

export default useApplicationData;
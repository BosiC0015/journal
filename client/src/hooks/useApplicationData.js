import axios from 'axios';

import {
  useEffect,
  useReducer
} from 'react';

import dataReducer, {
  SET_USER
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
  function signup(user) {
    return axios.post(`http://localhost:3001/api/users`, user)
      .then((res) => {
        const data = res.data
        if (data.msg) {
          throw new Error(data.msg);
        }
        else if (data.error) {
          throw new Error('Something wrong. Please try again!');
        }
      })
  }

  function login(pair) {
    return axios.
      post(`http://localhost:3001/api/users/${pair.email}`, pair)
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
          // transition(HOME);
        }
      })
    // .catch(err => {
    //   alert(err);
    //   // transition(ERROR_SIGNUP, true);
    // });
  }

  const [state, dispatch] = useReducer(dataReducer, {
    users: {}
  });

  console.log(state.user);
  return { state, dispatch, signup, login }
};

export default useApplicationData;
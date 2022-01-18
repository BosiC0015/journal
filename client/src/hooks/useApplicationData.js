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
  function signup(email, password, name) {
    const user = {
      email: email,
      password: password,
      name: name
    };
    return axios.post(`http://localhost:3001/api/users`, user)
      // return axios.get(`http://localhost:3001/api/users`)
      .then((res) => {
        console.log(res.data);
      });
    // dispatch(
    //   {
    //     type: SET_USER,
    //     user: user
    //   }
    // );
  }

  const [state, dispatch] = useReducer(dataReducer, {
    users: {}
  });

  console.log(state.user);
  return { state, signup }
};

export default useApplicationData;
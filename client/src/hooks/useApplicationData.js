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
      .then((res) => res.data);
  }

  const [state, dispatch] = useReducer(dataReducer, {
    users: {}
  });

  console.log(state.user);
  return { state, signup }
};

export default useApplicationData;
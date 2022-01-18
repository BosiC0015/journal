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
  function signup(user) {
    dispatch(
      {
        type: SET_USER,
        user: user
      }
    );
  }

  const [state, dispatch] = useReducer(dataReducer, {
    users: {}
  });

  return { state, signup }
};

export default useApplicationData;
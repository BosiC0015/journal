import axios from 'axios';

import {
  useEffect,
  useReducer
} from 'react';

import dataReducer, {
  SET_USERS
} from '../reducer/data_reducer';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: []
  });
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/users',
    })
      .then(({
        data
      }) => {
        console.log(data);
        dispatch({
          type: SET_USERS,
          users: data
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    state,
    dispatch
  };
};

export default useApplicationData;
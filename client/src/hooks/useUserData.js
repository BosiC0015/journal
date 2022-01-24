import axios from 'axios';
import { useEffect, useReducer } from 'react';
import dataReducer,
{ SET_USER, CLEAR_USER }
  from '../reducers/dataReducer';
import useDiariesData from './useDiariesData';
import usePlansData from './usePlansData';

const useUserData = () => {
  const { setDiariesData, clearDiariesData } = useDiariesData();
  const { setPlansData, clearPlansData } = usePlansData();

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
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('diaries', JSON.stringify(diaryData));
        sessionStorage.setItem('plans', JSON.stringify(planData));
        setUserData(userData);
        setDiariesData(diaryData);
        setPlansData(planData);
      });
  };
  // Reset local data and cookie when user logout
  function logout() {
    clearDiariesData();
    clearPlansData();
    sessionStorage.clear();
    dispatch({
      type: CLEAR_USER,
      user: {},
      isLoggedin: false
    });
  };
  // Call for set user data
  function setUserData(userData) {
    dispatch({
      type: SET_USER,
      user: userData,
      isLoggedin: true
    })
  };

  // Initialize necessary states
  const [userState, dispatch] = useReducer(dataReducer, {
    user: {},
    isLoggedin: false
  });

  // Get data from cookie when page refreshs
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  //console.log(userState.user, userState.isLoggedin);
  return { userState, signup, login, logout }
};

export default useUserData;
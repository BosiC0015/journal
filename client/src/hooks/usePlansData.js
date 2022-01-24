import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { updatetItemsById, deleteItemsById } from '../helpers/selectors';
import dataReducer, { SET_PLANS, CLEAR_PLANS } from '../reducers/dataReducer';

const usePlansData = () => {
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
  // Add new plan to local data and cookie
  function addUserPlan(plan) {
    // Copy of current user plans
    let plans = [...planState.plans];
    // Add new plan to the copy
    plans.push(plan);
    // Update cookie and current plan data
    sessionStorage.setItem('plans', JSON.stringify(plans));
    setPlansData(plans);
  };
  // Update existed local plans data and cookie
  function updateUserPlan(plan) {
    // Copy of current user plans
    let plans = [...planState.plans];
    // Update the copy of plans
    plans = updatetItemsById(plans, plan);
    // Update cookie and current plan data
    sessionStorage.setItem('plans', JSON.stringify(plans));
    setPlansData(plans);
  };
  // Delete and update existed local plans data and cookie
  function deleteUserPlan(plan) {
    // Copy of current user plans
    let plans = [...planState.plans];
    // Update the copy of plans
    plans = deleteItemsById(plans, plan);
    // Update cookie and current plan data
    sessionStorage.setItem('plans', JSON.stringify(plans));
    setPlansData(plans);
  };
  // Call for set plans data
  function setPlansData(plansData) {
    dispatch({
      type: SET_PLANS,
      plans: plansData
    })
  };
  // Call for clean plans data when user logout
  function clearPlansData() {
    dispatch({
      type: CLEAR_PLANS,
      plans: []
    })
  };

  // Initialize necessary states
  const [planState, dispatch] = useReducer(dataReducer, {
    plans: [],
    weekendsVisible: true
  });

  useEffect(() => {
    const plans = sessionStorage.getItem("plans");
    if (plans) {
      setPlansData(JSON.parse(plans));
    }
  }, []);

  return { planState, addPlan, deletePlan, updatePlan, setPlansData, clearPlansData }

};

export default usePlansData;
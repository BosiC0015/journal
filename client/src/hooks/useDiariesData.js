import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { updatetItemsById, deleteItemsById } from '../helpers/selectors';
import dataReducer, { SET_DIARIES, CLEAR_DIARIES } from '../reducers/dataReducer';

const useDiariesData = () => {
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

  // Add new diary to local data and cookie
  function addUserDiary(diary) {
    // Copy of current user diaries
    let diaries = [...diaryState.diaries];
    // Add new diary to the copy
    diaries.push(diary);
    // Update cookie and current diary data
    localStorage.setItem('diaries', JSON.stringify(diaries));
    setDiariesData(diaries);
  };

  // Update existed local diaries data and cookie
  function updateUserDiary(diary) {
    // Copy of current user diaries
    let diaries = [...diaryState.diaries];
    // Update the copy of diaries
    diaries = updatetItemsById(diaries, diary);
    // Update cookie and current diary data
    localStorage.setItem('diaries', JSON.stringify(diaries));
    setDiariesData(diaries);
  };

  // Delete and update existed local diaries data and cookie
  function deleteUserDiary(diary) {
    // Copy of current user diaries
    let diaries = [...diaryState.diaries];
    // Update the copy of diaries
    diaries = deleteItemsById(diaries, diary);
    // Update cookie and current diary data
    localStorage.setItem('diaries', JSON.stringify(diaries));
    setDiariesData(diaries);
  };

  // Call for set diaries data
  function setDiariesData(diariesData) {
    dispatch({
      type: SET_DIARIES,
      diaries: diariesData
    })
  };

  // Call for clear diaries data when user logout
  function clearDiariesData() {
    dispatch({
      type: CLEAR_DIARIES,
      diaries: []
    })
  };

  // Initialize necessary states
  const [diaryState, dispatch] = useReducer(dataReducer, {
    diaries: []
  });

  useEffect(() => {
    const diaries = localStorage.getItem("diaries");
    if (diaries) {
      setDiariesData(JSON.parse(diaries));
    }
  }, []);

  return { diaryState, submitDiary, updateDiary, deleteDiary, setDiariesData, clearDiariesData }
};

export default useDiariesData;
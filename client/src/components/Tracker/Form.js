import React, { useState } from "react";


export default function Form(props) {
  const [habit, setHabit] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const clear = (event) => {
    event.target.value = '';
    setErrorMsg('');
  }
  
  const validateNewHabit = (content) => {
    // const newHabit = { content: content, created_at: moment().format('L') };
    if (content === '') {
      setErrorMsg('Your new habit cannot be empty!');
      return;
    }
    setErrorMsg('');
    props.onSave(props.user_id, content)
      .then(() => {
        alert('Added new habit');
      })
    setHabit('');
  };

  return (
    <div>
      <section className="add-habit">
        <input 
          className="add-habit__input"
          placeholder="Add New Habit"
          name="content"
          value={habit}
          type="text"
          onFocus={(event) => clear(event)}
          onChange={(event) => setHabit(event.target.value)}
        />
        <button className="add-habit__submit" onClick={() => validateNewHabit(habit)}>Save</button>
      </section>
      <section className="validation">{errorMsg}</section>
    </div>
  );
};

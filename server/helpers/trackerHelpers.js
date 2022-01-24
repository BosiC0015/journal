module.exports = (db) => {

  const getHabitsOfUser = () => {
    const queryString =`
      SELECT
        habits.id,
        user_id,
        habits.content,
        habits.created_at
      FROM habits
    `;

    return db.query(queryString)
      .then(output => output.rows)
      .catch(err => console.log(err.message))
  }

  const getStatusOfHabit = () => {
    const queryString = `
      SELECT
        habit_id,
        day,
        completed
      FROM january_habits
    `;

    return db.query(queryString)
      .then(output => output.rows)
      .catch(err => console.log(err.message))
  }

  const addNewHabit = (user_id, content, time) => {
    const queryString = `
      INSERT INTO habits (user_id, content, created_at) 
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [user_id, content, time];

    return db.query(queryString, values)
      .then(res => res.rows)
      .catch(err => console.log(err.message))
  }

  const addTrackerBoxes = (habit_id) => {
    const queryString = `
      INSERT INTO january_habits (day, habit_id, completed) VALUES
      (1, $1, false), (2, $1, false), (3, $1, false), (4, $1, false), (5, $1, false),
      (6, $1, false), (7, $1, false), (8, $1, false), (9, $1, false), (10, $1, false),
      (11, $1, false), (12, $1, false), (13, $1, false), (14, $1, false), (15, $1, false),
      (16, $1, false), (17, $1, false), (18, $1, false), (19, $1, false), (20, $1, false),
      (21, $1, false), (22, $1, false), (23, $1, false), (24, $1, false), (25, $1, false),
      (26, $1, false), (27, $1, false), (28, $1, false), (29, $1, false), (30, $1, false),
      (31, $1, false) RETURNING *;
      `;
    const values = [habit_id];

    return db.query(queryString, values)
      .then(res => res.rows)
      .catch(err => console.log(err.message))
  }

  const changeStatusOfHabitToTrue = (day, habit_id) => {
    const queryString = `
      UPDATE january_habits 
      SET completed = true 
      WHERE day = $1 
      AND habit_id = $2;
    `;
    const values = [day, habit_id];

    return db.query(queryString, values)
      .then(res => res.rows)
      .catch(err => console.log(err.message))
  };

  const changeStatusOfHabitToFalse = (day, habit_id) => {
    const queryString = `
      UPDATE january_habits 
      SET completed = false 
      WHERE day = $1 
      AND habit_id = $2;
    `;
    const values = [day, habit_id];

    return db.query(queryString, values)
      .then(res => res.rows)
      .catch(err => console.log(err.message))
  };

  return { 
    getHabitsOfUser, 
    getStatusOfHabit, 
    addNewHabit, 
    addTrackerBoxes, 
    changeStatusOfHabitToTrue,
    changeStatusOfHabitToFalse
  }
}


      
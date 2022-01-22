const bcrypt = require('bcrypt');

module.exports = (db) => {
  // List all users from the database
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    }
    return db
      .query(query)
      .then((result) => result.rows);
  };

  // Get a single user given its email
  const getUserByEmail = email => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email]
    }
    return db
      .query(query)
      .then((result) => result.rows[0]);
  };

  // Add a new user to database
  const addUser = (email, password, name) => {
    const hash = bcrypt.hashSync(password, 10);
    const query = {
      text:
        `INSERT INTO users (email, PASSWORD, name)
        VALUES ($1, $2, $3) RETURNING *`,
      values: [email, hash, name]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };

  const getDiariesByUser = user_id => {
    const query = {
      text: `SELECT * FROM diaries WHERE user_id = $1`,
      values: [user_id]
    }
    return db
      .query(query)
      .then((result) => result.rows);
  };

  const addDiary = (user_id, title, content) => {
    const query = {
      text:
        `INSERT INTO diaries (user_id, title, content, date)
        VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [user_id, title, content, new Date().toLocaleString()]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };

  const updateDiary = (id, title, content) => {
    const query = {
      text:
        `UPDATE diaries
        SET title = $2, content = $3
        WHERE id = $1
        RETURNING *`,
      values: [id, title, content]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };

  const deleteDiary = (diary_id) => {
    const query = {
      text:
        `DELETE FROM diaries WHERE id = $1
        RETURNING *`,
      values: [diary_id]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };

  const getPlansByUser = user_id => {
    const query = {
      text: `SELECT * FROM plans WHERE user_id = $1`,
      values: [user_id]
    }
    return db
      .query(query)
      .then((result) => result.rows);
  };

  const addPlan = (user_id, title, start, end, allDay) => {
    const query = {
      text:
        `INSERT INTO plans (user_id, title, start_date, end_date, all_day)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      values: [user_id, title, start, end, allDay]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };

  const deletePlan = (plan_id) => {
    const query = {
      text:
        `DELETE FROM plans WHERE id = $1
        RETURNING *`,
      values: [plan_id]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };

  const updatePlan = (id, title, start, end, allDay) => {
    const query = {
      text:
        `UPDATE plans
        SET title = $2, start_date = $3, end_date = $4, all_day = $5 
        WHERE id = $1
        RETURNING *`,
      values: [id, title, start, end, allDay]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };

  return {
    getUsers,
    getUserByEmail,
    addUser,
    getDiariesByUser,
    addDiary,
    updateDiary,
    deleteDiary,
    getPlansByUser,
    addPlan,
    updatePlan,
    deletePlan
  };
};
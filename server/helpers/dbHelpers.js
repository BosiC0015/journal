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

  const getPlansByUser = user_id => {
    const query = {
      text: `SELECT * FROM plans WHERE user_id = $1`,
      values: [user_id]
    }
    return db
      .query(query)
      .then((result) => result.rows);
  };

  const addPlan = (user_id, title) => {
    const query = {
      text:
        `INSERT INTO plans (user_id, title, date)
        VALUES ($1, $2, $3) RETURNING *`,
      values: [user_id, title, new Date().toLocaleString()]
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
    getPlansByUser,
    addPlan
  };
};
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

  const getDiariesByUser = (user_id) => {

  };

  const addDiary = (user_id, title, content) => {
    //console.log(user_id, title, content);
    // const query = {
    //   text:
    //     `INSERT INTO diaries (user_id, title, content)
    //     VALUES ($1, $2, $3) RETURNING *`,
    //   values: [user_id, title, content]
    // }
    // return db.query(query)
    //   .then(result => result.rows[0]);
  };

  // const getUsersPosts = () => {
  //   const query = {
  //     text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
  //       FROM users
  //       INNER JOIN posts
  //       ON users.id = posts.user_id`
  //   }

  //   return db.query(query)
  //     .then(result => result.rows)
  //     .catch(err => err);

  // }

  return {
    getUsers,
    getUserByEmail,
    addUser,
    getDiariesByUser,
    addDiary
  };
};
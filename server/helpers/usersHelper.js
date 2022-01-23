const bcrypt = require('bcrypt');

module.exports = (db) => {
  // Select all users records from an user
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    }
    return db
      .query(query)
      .then((result) => result.rows);
  };
  // Select a single user record
  const getUserByEmail = email => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email]
    }
    return db
      .query(query)
      .then((result) => result.rows[0]);
  };
  // Insert a new user record
  const addUser = (email, password, name) => {
    const hash = bcrypt.hashSync(password, 10);
    const query = {
      text:
        `INSERT INTO users 
        (email, PASSWORD, name)
        VALUES ($1, $2, $3)
        RETURNING *`,
      values: [email, hash, name]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };

  return {
    getUsers,
    getUserByEmail,
    addUser
  };
};
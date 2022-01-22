const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = ({
  getUsers,
  getUserByEmail,
  addUser
}) => {
  // GET all users listing
  router.get('/', (req, res) => {
    getUsers()
      .then(users => res.json(users))
      .catch(err => res.json({
        error: err.message
      }));
  });

  // Login a user
  router.post(`/:email`, (req, res) => {
    const { email, password } = req.body;
    getUserByEmail(email)
      .then(user => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
          res.json({
            msg: 'Sorry, you enter a wrong email or password'
          });
        }
        else {
          res.json(user)
        }
      })
      .catch(err => res.json({
        error: err.message
      }));
  });

  // Add a new user
  router.post('/', (req, res) => {
    const { email, password, name } = req.body;
    getUserByEmail(email)
      .then(user => {
        if (user) {
          res.json({
            msg: 'Sorry, a user account with this email already exists'
          });
        }
        else {
          return addUser(email, password, name);
        }
      })
      .then(newUser => res.json(newUser))
      .catch(err => res.json({
        error: err.message
      }));
  });


  return router;
};
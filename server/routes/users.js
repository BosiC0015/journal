var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

// Examples:
// /* GET users listing. */
// const {
//   getPostsByUsers
// } = require('../helpers/dataHelpers');

module.exports = ({
  getUsers,
  getUserByEmail,
  addUser
}) => {
  /* GET all users listing */
  router.get('/', (req, res) => {
    getUsers()
      .then(users => res.json(users))
      .catch(err => res.json({
        error: err.message
      }));
  });

  /* Login a user given by email */
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

  /* Add a new user to database */
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
          return addUser(email, password, name)
        }
      })
      .then(newUser => res.json(newUser))
      .catch(err => res.json({
        error: err.message
      }));
  });


  return router;
};

//   /* GET users listing. */
//   router.get('/', (req, res) => {
//     getUsers()
//       .then((users) => res.json(users))
//       .catch((err) => res.json({
//         error: err.message
//       }));
//   });

//   router.get('/posts', (req, res) => {
//     getUsersPosts()
//       .then((usersPosts) => {
//         const formattedPosts = getPostsByUsers(usersPosts);
//         res.json(formattedPosts);
//       })
//       .catch((err) => res.json({
//         error: err.message
//       }));
//   });
//   })
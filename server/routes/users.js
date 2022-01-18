var express = require('express');
var router = express.Router();

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

  /* GET a user listing by Email */
  router.get('/:email', (req, res) => {
    const { email } = req.params;
    getUserByEmail(email)
      .then(user => res.json(user))
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
            error: 'Sorry, a user account with this email already exists'
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
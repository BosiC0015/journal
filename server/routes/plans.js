const express = require('express');
const router = express.Router();

module.exports = ({
  getUserByEmail,
  getPlansByUser,
  addPlan
}) => {
  /* GET all plans listing from a user by given email*/
  router.get('/:email', (req, res) => {
    const { email } = req.params;
    console.log(email);
    getUserByEmail(email)
      .then(user => {
        if (!user) {
          throw new Error('Sorry, user does not exist');
        }
        else {
          return getPlansByUser(user.id)
        }
      })
      .then(data => res.json(data))
      .catch(err => res.json({
        error: err.message
      }));
  });


  router.post(`/`, (req, res) => {
    const { email, title } = req.body;
    getUserByEmail(email)
      .then(user => {
        if (!user) {
          throw new Error('Sorry, user does not exist');
        }
        else {
          return addPlan(user.id, title);
        }
      })
      .then(newPlan => res.json(newPlan))
      .catch(err => res.json({
        error: err.message
      }));
  });


  return router;
};
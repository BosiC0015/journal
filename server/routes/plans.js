const express = require('express');
const router = express.Router();

module.exports = ({
  getUserByEmail,
  addPlan
}) => {


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
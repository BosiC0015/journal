const express = require('express');
const router = express.Router();

module.exports = ({
  getUserByEmail,
  getPlansByUser,
  deletePlansByUser,
  addPlan,
  updatePlan
}) => {
  /* GET all plans listing from a user by given email*/
  router.get('/:email', (req, res) => {
    const { email } = req.params;
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
    const { email, title, start, end, allDay } = req.body;
    getUserByEmail(email)
      .then(user => {
        if (!user) {
          throw new Error('Sorry, user does not exist');
        }
        else {
          return addPlan(user.id, title, start, end, allDay);
        }
      })
      .then(newPlan => res.json(newPlan))
      .catch(err => res.json({
        error: err.message
      }));
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    deletePlansByUser(id)
      .then(data => res.json(data))
      .catch(err => res.json({
        error: err.message
      }));
  });

  router.put(`/`, (req, res) => {
    const { id, title, start, end, allDay } = req.body;
    updatePlan(id, title, start, end, allDay)
      .then(newPlan => res.json(newPlan))
      .catch(err => res.json({
        error: err.message
      }));
  });


  return router;
};
const express = require('express')
const router = express.Router();

module.exports = ({ getHabitsOfUser, addNewHabit, addTrackerBoxes }) => {

  router.get('/', (req, res) => {
    getHabitsOfUser()
      .then(habits => res.json(habits))
      .catch(err => res.json(err.message))
  });

  router.post('/', (req, res) => {
    const { id, content, created_at } = req.body;
    addNewHabit(content, created_at)
      .then(newHabit => res.json(newHabit))
      .then(res => {
        addTrackerBoxes(id)
        .then(habits => res.json(habits))
        .catch(err => console.log(err.message))
      })
      .catch(err => res.json(err.message))
  });

  return router;
};
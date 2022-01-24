const express = require('express')
const router = express.Router();

module.exports = ({ getHabitsOfUser, addNewHabit, addTrackerBoxes }) => {

  router.get('/', (req, res) => {
    getHabitsOfUser()
      .then(habits => res.json(habits))
      .catch(err => res.json(err.message))
  });

  router.post('/', (req, res) => {
    const { id, user_id, content, created_at } = req.body;
    addNewHabit(user_id ,content, created_at)
      .then((newHabit) => res.json(newHabit))
      .then((req, res) => {
        addTrackerBoxes(id)
        .then(habits => res.json(habits))
        .catch(err => console.log(err.message))
      })
      
      .catch(err => console.log(err.message))
  });

  return router;
};
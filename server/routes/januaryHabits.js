const router = require('express').Router();

module.exports = ({ getStatusOfHabit, changeStatusOfHabitToTrue, changeStatusOfHabitToFalse }) => {

  router.get('/', (req, res) => {
    getStatusOfHabit()
      .then(status => res.json(status))
      .catch(err => res.json(err.message))
  });

  router.post('/true', (req, res) => {
    const { day, habit_id } = req.body;
    changeStatusOfHabitToTrue(day, habit_id)
      .then(status => res.json(status))
      .catch(err => res.json(err.message))
  })

  router.post('/false', (req, res) => {
    const { day, habit_id } = req.body;
    changeStatusOfHabitToFalse(day, habit_id)
      .then(status => res.json(status))
      .catch(err => res.json(err.message))
  })

  return router;
}
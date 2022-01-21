const express = require('express');
const router = express.Router();

module.exports = ({
  getUserByEmail,
  getDiariesByUser,
  addDiary
}) => {
  /* GET all diaries listing from a user */
  router.get('/', (req, res) => {
    const { email } = req.params;
    getUserByEmail(email)
      .then(user => {
        if (!user) {
          throw new Error('Sorry, user does not exist');
        }
        else {
          return getDiariesByUser(user.id)
        }
      })
      .then(data => res.json(data))
      .catch(err => res.json({
        error: err.message
      }));
  });

  router.post(`/`, (req, res) => {
    const { email, title, content } = req.body;
    getUserByEmail(email)
      .then(user => {
        if (!user) {
          throw new Error('Sorry, user does not exist');
        }
        else {
          return addDiary(user.id, title, content);
        }
      })
      .then(newDiary => res.json(newDiary))
      .catch(err => res.json({
        error: err.message
      }));
  });


  return router;
};
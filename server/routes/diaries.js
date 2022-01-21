const express = require('express');
const router = express.Router();

module.exports = ({
  getUserByEmail,
  getDiariesByUser,
  addDiary
}) => {
  /* GET all diaries listing from a user */
  router.get('/:email', (req, res) => {
    const { email } = req.params;
    getUserByEmail(email)
      .then(user => {
        if (!user) {
          throw new Error('Sorry, user does not exist');
        }
        else {
          getDiariesByUser(user.id)
            .then(data => res.json(data));
        }
      })
      .catch(err => res.json({
        error: err.message
      }));
  });

  router.post(`/:email`, (req, res) => {
    const { email, title, content } = req.body;
    getUserByEmail(email)
      .then(user => {
        if (!user) {
          throw new Error('Sorry, user does not exist');
        }
        else {
          addDiary(user.id, title, content);
        }
      })
      .catch(err => res.json({
        error: err.message
      }));
  });


  return router;
};
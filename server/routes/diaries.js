const express = require('express');
const router = express.Router();

module.exports = ({
  getUserByEmail,
  //getDiariesByUser,
  addDiary
}) => {

  router.post(`/:email`, (req, res) => {
    const { email, title, content } = req.body;
    getUserByEmail(email)
      .then(user => {
        if (!user) {
          throw new Error('Sorry, user does not exist');
        }
        else {
          console.log(user.id, title, content);
          addDiary(user.id, title, content);
        }
      })
      .catch(err => res.json({
        error: err.message
      }));
  });


  return router;
};
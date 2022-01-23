const express = require('express');
const router = express.Router();
const db = require('../db');
const usersHelpers = require('../helpers/usersHelper')(db);

const { getUserByEmail } = usersHelpers;

module.exports = ({
  getDiariesByUser,
  addDiary,
  updateDiary,
  deleteDiary
}) => {
  // GET all diaries listing from a user by given email
  router.get('/:email', (req, res) => {
    const { email } = req.params;
    console.log(email);
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

  // Create a diary
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

  // Update existed diary
  router.put(`/`, (req, res) => {
    const { id, title, content } = req.body;
    updateDiary(id, title, content)
      .then(newDiary => res.json(newDiary))
      .catch(err => res.json({
        error: err.message
      }));
  });

  // Delete existed diary
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    deleteDiary(id)
      .then(data => res.json(data))
      .catch(err => res.json({
        error: err.message
      }));
  });


  return router;
};
module.exports = (db) => {
  // Select all diaries records from an user
  const getDiariesByUser = user_id => {
    const query = {
      text: `SELECT * FROM diaries WHERE user_id = $1`,
      values: [user_id]
    }
    return db
      .query(query)
      .then((result) => result.rows);
  };
  // Insert a new diary record
  const addDiary = (user_id, title, content) => {
    const query = {
      text:
        `INSERT INTO diaries 
        (user_id, title, content, date)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      values: [user_id, title, content, new Date().toLocaleString()]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };
  // Update a diary record
  const updateDiary = (id, title, content) => {
    const query = {
      text:
        `UPDATE diaries
        SET title = $2, content = $3
        WHERE id = $1
        RETURNING *`,
      values: [id, title, content]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };
  // Delete a diary record
  const deleteDiary = (diary_id) => {
    const query = {
      text:
        `DELETE FROM diaries WHERE id = $1
        RETURNING *`,
      values: [diary_id]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };

  return {
    getDiariesByUser,
    addDiary,
    updateDiary,
    deleteDiary
  };
};
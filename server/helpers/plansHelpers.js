module.exports = (db) => {
  // Select all plans record from an user
  const getPlansByUser = user_id => {
    const query = {
      text: `SELECT * FROM plans WHERE user_id = $1`,
      values: [user_id]
    }
    return db
      .query(query)
      .then((result) => result.rows);
  };
  // Insert a new plan record
  const addPlan = (user_id, title, start, end, allDay) => {
    const query = {
      text:
        `INSERT INTO plans 
        (user_id, title, start_date, end_date, all_day)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
      values: [user_id, title, start, end, allDay]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };
  // Delete a plan record
  const deletePlan = (plan_id) => {
    const query = {
      text:
        `DELETE FROM plans WHERE id = $1
        RETURNING *`,
      values: [plan_id]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };
  // Update a plan record
  const updatePlan = (id, title, start, end, allDay) => {
    const query = {
      text:
        `UPDATE plans
        SET title = $2, start_date = $3, end_date = $4, all_day = $5 
        WHERE id = $1
        RETURNING *`,
      values: [id, title, start, end, allDay]
    }
    return db.query(query)
      .then(result => result.rows[0]);
  };

  return {
    getPlansByUser,
    addPlan,
    updatePlan,
    deletePlan
  };
};
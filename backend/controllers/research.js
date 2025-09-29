const pool = require('../config/database');

const getAllResearch = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM research ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllResearch };
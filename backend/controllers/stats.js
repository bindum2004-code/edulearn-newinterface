const pool = require('../config/database');

const getAllStats = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stats');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllStats };
const pool = require('../config/database');

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    const result = await pool.query(
      'INSERT INTO contact_messages (name, email, phone, subject, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, subject, message]
    );
    
    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { submitContact, getContactMessages };
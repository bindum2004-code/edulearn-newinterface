const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/courses', require('./routes/courses'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/team', require('./routes/team'));
app.use('/api/research', require('./routes/research'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/contact', require('./routes/contact'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'EduLearn API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Research endpoints
app.get('/api/research', (req, res) => {
  pool.query('SELECT * FROM research ORDER BY created_at DESC', (error, results) => {
    if (error) {
      console.error('Error fetching research:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results.rows);
  });
});

app.get('/api/research/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM research WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.error('Error fetching research:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Research not found' });
    }
    res.json(results.rows[0]);
  });
});

app.get('/api/research/categories', (req, res) => {
  pool.query(`
    SELECT 
      category as name,
      COUNT(*) as research_count,
      'Research category description' as description
    FROM research 
    GROUP BY category 
    ORDER BY research_count DESC
  `, (error, results) => {
    if (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    // Add "All" category
    const categories = [
      { id: 0, name: 'All', description: 'All research projects', research_count: results.rows.reduce((sum, row) => sum + parseInt(row.research_count), 0) },
      ...results.rows.map((row, index) => ({
        id: index + 1,
        name: row.name,
        description: row.description,
        research_count: parseInt(row.research_count)
      }))
    ];
    
    res.json(categories);
  });
});

app.get('/api/research/category/:category', (req, res) => {
  const { category } = req.params;
  pool.query('SELECT * FROM research WHERE category = $1 ORDER BY created_at DESC', [category], (error, results) => {
    if (error) {
      console.error('Error fetching research by category:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results.rows);
  });
});

app.get('/api/research/status/:status', (req, res) => {
  const { status } = req.params;
  pool.query('SELECT * FROM research WHERE status = $1 ORDER BY created_at DESC', [status], (error, results) => {
    if (error) {
      console.error('Error fetching research by status:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results.rows);
  });
});
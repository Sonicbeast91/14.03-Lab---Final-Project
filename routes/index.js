// routes/index.js
// Downtown Donuts prototype routes
// Uses MariaDB connection from bin/db.js

var express = require('express');
var router = express.Router();

// Helper: group menu items by category
function groupMenuByCategory(rows) {
  const grouped = {};
  rows.forEach((item) => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });
  return grouped;
}

/* GET landing page */
router.get('/', function (req, res) {
  try {
    req.db.query(
      'SELECT * FROM donut_menu_items WHERE is_featured = 1 AND is_available = 1 ORDER BY id LIMIT 6;',
      (err, rows) => {
        if (err) {
          console.error('Error fetching featured items:', err);
          return res.render('index', {
            title: 'Downtown Donuts',
            featuredItems: []
          });
        }

        res.render('index', {
          title: 'Downtown Donuts',
          featuredItems: rows
        });
      }
    );
  } catch (error) {
    console.error('Error in / route:', error);
    res.render('index', { title: 'Downtown Donuts', featuredItems: [] });
  }
});

/* GET menu page */
router.get('/menu', function (req, res) {
  try {
    req.db.query(
      'SELECT * FROM donut_menu_items WHERE is_available = 1 ORDER BY category, name;',
      (err, rows) => {
        if (err) {
          console.error('Error fetching menu:', err);
          return res.render('menu', {
            title: 'Menu',
            menuByCategory: null
          });
        }

        const menuByCategory = groupMenuByCategory(rows);
        res.render('menu', {
          title: 'Menu',
          menuByCategory
        });
      }
    );
  } catch (error) {
    console.error('Error in /menu route:', error);
    res.render('menu', { title: 'Menu', menuByCategory: null });
  }
});

/* GET about page (no DB needed) */
router.get('/about', function (req, res) {
  res.render('about', { title: 'Our Story' });
});

/* GET comments page */
router.get('/comments', function (req, res) {
  try {
    req.db.query(
      'SELECT id, name, visit_experience, rating, comment, created_at FROM donut_comments ORDER BY created_at DESC LIMIT 25;',
      (err, rows) => {
        if (err) {
          console.error('Error fetching comments:', err);
          return res.render('comments', {
            title: 'Community Wall',
            comments: []
          });
        }

        res.render('comments', {
          title: 'Community Wall',
          comments: rows
        });
      }
    );
  } catch (error) {
    console.error('Error in GET /comments:', error);
    res.render('comments', { title: 'Community Wall', comments: [] });
  }
});

/* POST new comment */
router.post('/comments', function (req, res) {
  const { name, visit_experience, rating, comment } = req.body;

  if (!name || !rating || !comment) {
    return res.redirect('/comments');
  }

  try {
    req.db.query(
      'INSERT INTO donut_comments (name, visit_experience, rating, comment) VALUES (?, ?, ?, ?);',
      [name, visit_experience || 'Dine-in', rating, comment],
      (err) => {
        if (err) {
          console.error('Error inserting comment:', err);
        }
        res.redirect('/comments');
      }
    );
  } catch (error) {
    console.error('Error in POST /comments:', error);
    res.redirect('/comments');
  }
});

module.exports = router;

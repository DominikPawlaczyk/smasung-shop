// routes/userRoutes.js - Routing dla użytkowników (REST API)

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { users } = require('../models/User');

// GET /api/users/profile - F9: Pobieranie profilu użytkownika
router.get('/profile', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
    }
    const { password, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/users/profile - F9: Aktualizacja profilu użytkownika
router.put('/profile', authenticateToken, (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
    }
    
    const { firstName, lastName } = req.body;
    users[userIndex] = { ...users[userIndex], firstName, lastName };
    
    const { password, ...userWithoutPassword } = users[userIndex];
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

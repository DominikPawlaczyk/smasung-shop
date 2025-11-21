// routes/authRoutes.js - Routing dla autentykacji (REST API)

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register - F1: Rejestracja użytkownika
router.post('/register', authController.register.bind(authController));

// POST /api/auth/login - F2: Logowanie użytkownika
router.post('/login', authController.login.bind(authController));

module.exports = router;

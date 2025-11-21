// routes/orderRoutes.js - Routing dla zamówień (REST API)

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Wszystkie endpointy wymagają autoryzacji
router.use(authenticateToken);

// POST /api/orders - F8: Tworzenie zamówienia
router.post('/', orderController.createOrder.bind(orderController));

// GET /api/orders/my - F9: Pobieranie zamówień użytkownika
router.get('/my', orderController.getUserOrders.bind(orderController));

// GET /api/orders/:id - Pobieranie pojedynczego zamówienia
router.get('/:id', orderController.getOrderById.bind(orderController));

// F11: Endpointy administracyjne
router.get('/', isAdmin, orderController.getAllOrders.bind(orderController));
router.patch('/:id/status', isAdmin, orderController.updateOrderStatus.bind(orderController));

module.exports = router;

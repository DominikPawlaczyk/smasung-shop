// controllers/orderController.js - Kontroler zamówień

const orderService = require('../services/orderService');

class OrderController {
  // F8 - Tworzenie zamówienia
  createOrder(req, res) {
    try {
      const userId = req.user.id; // Z tokenu JWT
      const order = orderService.createOrder(userId, req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // F9 - Pobieranie zamówień użytkownika
  getUserOrders(req, res) {
    try {
      const userId = req.user.id;
      const orders = orderService.getUserOrders(userId);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // F11 - Pobieranie wszystkich zamówień (admin)
  getAllOrders(req, res) {
    try {
      const orders = orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // F11 - Aktualizacja statusu zamówienia (admin)
  updateOrderStatus(req, res) {
    try {
      const { status } = req.body;
      const order = orderService.updateOrderStatus(req.params.id, status);
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Pobieranie pojedynczego zamówienia
  getOrderById(req, res) {
    try {
      const order = orderService.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Zamówienie nie znalezione' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();

// F11: Przeglądanie historii zamówień

// Service
class OrderService {
  // Pobieranie zamówień użytkownika
  getUserOrders(userId) {
    return orders
      .filter(o => o.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  // Pobieranie pojedynczego zamówienia
  getOrderById(orderId) {
    return orders.find(o => o.id === parseInt(orderId));
  }
}

// Controller
class OrderController {
  getUserOrders(req, res) {
    try {
      const orders = orderService.getUserOrders(req.user.id);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

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

// Routes
router.get('/my', authenticateToken, orderController.getUserOrders);
router.get('/:id', authenticateToken, orderController.getOrderById);

// services/orderService.js - Warstwa logiki biznesowej dla zamówień

const { Order, orders } = require('../models/Order');
const { products } = require('../models/Product');

class OrderService {
  // F8 - Tworzenie zamówienia
  createOrder(userId, orderData) {
    const { items, shippingMethod, paymentMethod } = orderData;

    // Walidacja dostępności produktów
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        throw new Error(`Produkt o ID ${item.productId} nie istnieje`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Niewystarczająca ilość produktu: ${product.name}`);
      }
    }

    // Obliczanie całkowitej ceny
    const totalPrice = items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product.price * item.quantity);
    }, 0);

    // Tworzenie zamówienia
    const newOrder = new Order(
      orders.length + 1,
      userId,
      items,
      totalPrice,
      shippingMethod,
      paymentMethod
    );

    // Aktualizacja stanów magazynowych
    items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      product.stock -= item.quantity;
    });

    orders.push(newOrder);
    return newOrder;
  }

  // F9 - Pobieranie zamówień użytkownika
  getUserOrders(userId) {
    return orders.filter(o => o.userId === userId);
  }

  // F11 - Pobieranie wszystkich zamówień (admin)
  getAllOrders() {
    return orders;
  }

  // F11 - Aktualizacja statusu zamówienia (admin)
  updateOrderStatus(orderId, status) {
    const order = orders.find(o => o.id === parseInt(orderId));
    if (!order) {
      throw new Error('Zamówienie nie znalezione');
    }
    order.status = status;
    return order;
  }

  // Pobieranie pojedynczego zamówienia
  getOrderById(orderId) {
    return orders.find(o => o.id === parseInt(orderId));
  }
}

module.exports = new OrderService();

// models/Order.js - Model zamówienia (warstwa danych)
// Reprezentuje strukturę zamówienia klienta

class Order {
  constructor(id, userId, items, totalPrice, shippingMethod, paymentMethod, status = 'pending') {
    this.id = id;
    this.userId = userId;
    this.items = items; // Tablica produktów: [{productId, quantity, price}]
    this.totalPrice = totalPrice;
    this.shippingMethod = shippingMethod; // 'courier', 'inpost', 'pickup'
    this.paymentMethod = paymentMethod; // 'card', 'paypal', 'blik'
    this.status = status; // 'pending', 'paid', 'shipped', 'delivered', 'cancelled'
    this.createdAt = new Date();
  }
}

// Mockowa baza zamówień (w pamięci)
const orders = [];

module.exports = { Order, orders };

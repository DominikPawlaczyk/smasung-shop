// F8: Wybór adresu dostawy
// F9: Wybór metody płatności
// F10: Potwierdzenie zamówienia

// Model Order
class Order {
  constructor(id, userId, items, totalPrice, shippingAddress, shippingMethod, paymentMethod, status = 'pending') {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress; // F8
    this.shippingMethod = shippingMethod;
    this.paymentMethod = paymentMethod; // F9
    this.status = status;
    this.createdAt = new Date();
  }
}

// Service
class OrderService {
  // F10 - Tworzenie zamówienia z adresem dostawy i metodą płatności
  createOrder(userId, orderData) {
    const { items, shippingAddress, shippingMethod, paymentMethod } = orderData;

    // Walidacja
    if (!shippingAddress) throw new Error('Adres dostawy jest wymagany');
    if (!items || items.length === 0) throw new Error('Koszyk jest pusty');

    // Sprawdzenie dostępności produktów
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      if (!product) throw new Error(`Produkt o ID ${item.productId} nie istnieje`);
      if (product.stock < item.quantity) throw new Error(`Niewystarczająca ilość: ${product.name}`);
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
      shippingAddress,
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
}

// Controller
class OrderController {
  createOrder(req, res) {
    try {
      const order = orderService.createOrder(req.user.id, req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

// Routes
router.post('/', authenticateToken, orderController.createOrder);

// Przykład użycia - Request Body:
/*
{
  "items": [
    { "productId": 1, "quantity": 2 }
  ],
  "shippingAddress": {
    "street": "ul. Testowa 1",
    "city": "Warszawa",
    "postalCode": "00-001",
    "country": "Polska"
  },
  "shippingMethod": "courier",
  "paymentMethod": "card"
}
*/

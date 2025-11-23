// F13: Zarządzanie produktami (admin)
// F14: Zarządzanie zamówieniami (admin)

// Middleware - Autoryzacja admina
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Brak uprawnień administratora' });
  }
  next();
};

// F13 - Zarządzanie produktami
class ProductService {
  addProduct(productData) {
    const newProduct = new Product(
      products.length + 1,
      productData.name,
      productData.model,
      productData.category,
      productData.price,
      productData.description,
      productData.specs,
      productData.image,
      productData.stock
    );
    products.push(newProduct);
    return newProduct;
  }

  updateProduct(id, updates) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Produkt nie znaleziony');
    products[index] = { ...products[index], ...updates };
    return products[index];
  }

  deleteProduct(id) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Produkt nie znaleziony');
    products.splice(index, 1);
    return { message: 'Produkt usunięty' };
  }
}

class ProductController {
  addProduct(req, res) {
    try {
      const product = productService.addProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  updateProduct(req, res) {
    try {
      const product = productService.updateProduct(req.params.id, req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  deleteProduct(req, res) {
    try {
      const result = productService.deleteProduct(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

// F14 - Zarządzanie zamówieniami
class OrderService {
  getAllOrders() {
    return orders.sort((a, b) => b.createdAt - a.createdAt);
  }

  updateOrderStatus(orderId, status) {
    const validStatuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) throw new Error('Nieprawidłowy status');
    
    const order = orders.find(o => o.id === parseInt(orderId));
    if (!order) throw new Error('Zamówienie nie znalezione');
    
    order.status = status;
    return order;
  }
}

class OrderController {
  getAllOrders(req, res) {
    try {
      const orders = orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  updateOrderStatus(req, res) {
    try {
      const { status } = req.body;
      const order = orderService.updateOrderStatus(req.params.id, status);
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

// Routes - F13
router.post('/', authenticateToken, isAdmin, productController.addProduct);
router.put('/:id', authenticateToken, isAdmin, productController.updateProduct);
router.delete('/:id', authenticateToken, isAdmin, productController.deleteProduct);

// Routes - F14
router.get('/', authenticateToken, isAdmin, orderController.getAllOrders);
router.patch('/:id/status', authenticateToken, isAdmin, orderController.updateOrderStatus);

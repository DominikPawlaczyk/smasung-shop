// F6: Dodawanie do koszyka
// F7: Edycja koszyka

// Model Cart
class Cart {
  constructor(userId) {
    this.userId = userId;
    this.items = [];
  }

  addItem(productId, quantity = 1) {
    const existingItem = this.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ productId, quantity });
    }
  }

  updateItem(productId, quantity) {
    const item = this.items.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
  }

  clear() {
    this.items = [];
  }
}

// Service
class CartService {
  addToCart(userId, productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (!product) throw new Error('Produkt nie istnieje');
    if (product.stock < quantity) throw new Error('Niewystarczająca ilość w magazynie');

    const cart = carts.get(userId) || new Cart(userId);
    cart.addItem(productId, quantity);
    carts.set(userId, cart);
    return this.populateCart(cart);
  }

  updateCartItem(userId, productId, quantity) {
    const cart = carts.get(userId);
    if (!cart) throw new Error('Koszyk nie istnieje');
    cart.updateItem(productId, quantity);
    return this.populateCart(cart);
  }

  removeFromCart(userId, productId) {
    const cart = carts.get(userId);
    if (!cart) throw new Error('Koszyk nie istnieje');
    cart.removeItem(productId);
    return this.populateCart(cart);
  }

  populateCart(cart) {
    const items = cart.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return product ? { ...item, product, subtotal: product.price * item.quantity } : null;
    }).filter(Boolean);

    const totalPrice = items.reduce((sum, item) => sum + item.subtotal, 0);
    return { items, totalPrice };
  }
}

// Controller
class CartController {
  addToCart(req, res) {
    try {
      const { productId, quantity } = req.body;
      const cart = cartService.addToCart(req.user.id, productId, quantity || 1);
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  updateCartItem(req, res) {
    try {
      const { quantity } = req.body;
      const cart = cartService.updateCartItem(req.user.id, parseInt(req.params.productId), quantity);
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  removeFromCart(req, res) {
    try {
      const cart = cartService.removeFromCart(req.user.id, parseInt(req.params.productId));
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

// Routes
router.post('/', authenticateToken, cartController.addToCart);
router.put('/:productId', authenticateToken, cartController.updateCartItem);
router.delete('/:productId', authenticateToken, cartController.removeFromCart);

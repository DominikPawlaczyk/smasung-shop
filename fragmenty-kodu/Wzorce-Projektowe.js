// WZORCE PROJEKTOWE I ARCHITEKTONICZNE

// 1. WZORZEC SINGLETON
// Zapewnia jedną instancję serwisu w całej aplikacji

class AuthService {
  constructor() {
    if (AuthService.instance) {
      return AuthService.instance; // Zwraca istniejącą instancję
    }
    AuthService.instance = this;
  }

  async register(email, password, firstName, lastName) {
    // Logika rejestracji
  }

  async login(email, password) {
    // Logika logowania
  }
}

// Eksport jednej instancji
module.exports = new AuthService();

// Użycie w różnych miejscach aplikacji:
// const authService = require('./services/authService');
// Zawsze ta sama instancja!


// 2. ARCHITEKTURA WARSTWOWA (Layered Architecture)

// Warstwa 1: Model (Data Layer)
class User {
  constructor(id, email, password, firstName, lastName) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

// Warstwa 2: Service (Business Logic Layer)
class UserService {
  getUserById(id) {
    return users.find(u => u.id === id);
  }
  
  updateUser(id, updates) {
    const user = this.getUserById(id);
    Object.assign(user, updates);
    return user;
  }
}

// Warstwa 3: Controller (Presentation Layer)
class UserController {
  getProfile(req, res) {
    try {
      const user = userService.getUserById(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// Warstwa 4: Routes (API Layer)
router.get('/profile', authenticateToken, userController.getProfile);


// 3. MIDDLEWARE PATTERN
// Funkcje pośredniczące w przetwarzaniu requestów

// Middleware autoryzacji JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Brak tokenu autoryzacyjnego' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Nieprawidłowy token' });
    }
    req.user = user;
    next(); // Przekazanie do następnej funkcji
  });
};

// Middleware sprawdzający rolę admina
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Brak uprawnień administratora' });
  }
  next();
};

// Użycie middleware w routingu
router.post('/products', authenticateToken, isAdmin, productController.addProduct);


// 4. REPOSITORY PATTERN (uproszczona wersja)
// Separacja logiki dostępu do danych

class UserRepository {
  findAll() {
    return users;
  }

  findById(id) {
    return users.find(u => u.id === id);
  }

  findByEmail(email) {
    return users.find(u => u.email === email);
  }

  save(user) {
    users.push(user);
    return user;
  }

  update(id, updates) {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      return users[index];
    }
    return null;
  }
}


// 5. FACTORY PATTERN (dla tworzenia obiektów)

class OrderFactory {
  static createOrder(userId, orderData) {
    const { items, shippingAddress, shippingMethod, paymentMethod } = orderData;
    
    const totalPrice = items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product.price * item.quantity);
    }, 0);

    return new Order(
      orders.length + 1,
      userId,
      items,
      totalPrice,
      shippingAddress,
      shippingMethod,
      paymentMethod
    );
  }
}

// Użycie
const newOrder = OrderFactory.createOrder(userId, orderData);

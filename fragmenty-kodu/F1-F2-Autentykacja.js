// F1: Rejestracja użytkownika
// F2: Logowanie użytkownika

// Model User
class User {
  constructor(id, email, password, firstName, lastName, role = 'customer') {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}

// Service - Logika biznesowa (Wzorzec Singleton)
class AuthService {
  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }
    AuthService.instance = this;
  }

  async register(email, password, firstName, lastName) {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Użytkownik już istnieje');
    }

    const newUser = new User(users.length + 1, email, `hashed_${password}`, firstName, lastName);
    users.push(newUser);
    
    const token = this.generateToken(newUser);
    return { user: this.sanitizeUser(newUser), token };
  }

  async login(email, password) {
    const user = users.find(u => u.email === email);
    if (!user || user.password !== `hashed_${password}`) {
      throw new Error('Nieprawidłowy email lub hasło');
    }

    const token = this.generateToken(user);
    return { user: this.sanitizeUser(user), token };
  }

  generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, 
                    process.env.JWT_SECRET, { expiresIn: '24h' });
  }

  sanitizeUser(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

// Controller - Obsługa HTTP
class AuthController {
  async register(req, res) {
    try {
      const { email, password, firstName, lastName } = req.body;
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
      }
      const result = await authService.register(email, password, firstName, lastName);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email i hasło są wymagane' });
      }
      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

// Routes - Routing REST API
router.post('/register', authController.register);
router.post('/login', authController.login);

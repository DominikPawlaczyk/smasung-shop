// F12: Zarządzanie danymi konta

// Model User - rozszerzenie
class User {
  constructor(id, email, password, firstName, lastName, role = 'customer') {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.addresses = []; // Lista adresów
    this.createdAt = new Date();
  }

  addAddress(address) {
    this.addresses.push({ id: this.addresses.length + 1, ...address });
  }
}

// Service
class UserService {
  getUserProfile(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Użytkownik nie znaleziony');
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  updateUserProfile(userId, updates) {
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Użytkownik nie znaleziony');
    
    Object.assign(user, updates);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  addAddress(userId, address) {
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Użytkownik nie znaleziony');
    user.addAddress(address);
    return user.addresses;
  }

  updateAddress(userId, addressId, updates) {
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Użytkownik nie znaleziony');
    
    const address = user.addresses.find(a => a.id === addressId);
    if (!address) throw new Error('Adres nie znaleziony');
    
    Object.assign(address, updates);
    return user.addresses;
  }

  deleteAddress(userId, addressId) {
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Użytkownik nie znaleziony');
    
    user.addresses = user.addresses.filter(a => a.id !== addressId);
    return user.addresses;
  }

  getAddresses(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Użytkownik nie znaleziony');
    return user.addresses;
  }
}

// Controller
class UserController {
  getProfile(req, res) {
    try {
      const profile = userService.getUserProfile(req.user.id);
      res.status(200).json(profile);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  updateProfile(req, res) {
    try {
      const profile = userService.updateUserProfile(req.user.id, req.body);
      res.status(200).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  addAddress(req, res) {
    try {
      const addresses = userService.addAddress(req.user.id, req.body);
      res.status(201).json(addresses);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

// Routes
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, userController.updateProfile);
router.get('/addresses', authenticateToken, userController.getAddresses);
router.post('/addresses', authenticateToken, userController.addAddress);
router.put('/addresses/:addressId', authenticateToken, userController.updateAddress);
router.delete('/addresses/:addressId', authenticateToken, userController.deleteAddress);

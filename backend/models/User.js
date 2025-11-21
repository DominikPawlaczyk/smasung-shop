// models/User.js - Model użytkownika (warstwa danych)
// Reprezentuje strukturę danych użytkownika w systemie

class User {
  constructor(id, email, password, firstName, lastName, role = 'customer') {
    this.id = id;
    this.email = email;
    this.password = password; // W prawdziwej aplikacji: zahashowane hasło
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role; // 'customer' lub 'admin'
    this.createdAt = new Date();
  }
}

// Mockowa baza danych użytkowników (w pamięci)
// W prawdziwej aplikacji: MySQL/MongoDB
const users = [
  {
    id: 1,
    email: 'admin@samsung.com',
    password: '$2a$10$mockHashedPassword', // Mockowe zahashowane hasło
    firstName: 'Admin',
    lastName: 'Samsung',
    role: 'admin',
    createdAt: new Date()
  }
];

module.exports = { User, users };

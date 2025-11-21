// models/Product.js - Model produktu (warstwa danych)
// Reprezentuje strukturę danych produktu Samsung

class Product {
  constructor(id, name, model, category, price, description, specs, image, stock) {
    this.id = id;
    this.name = name;
    this.model = model;
    this.category = category; // 'smartphone' lub 'accessory'
    this.price = price;
    this.description = description;
    this.specs = specs; // Parametry techniczne
    this.image = image;
    this.stock = stock;
    this.sku = `SAM-${category.substring(0, 3).toUpperCase()}-${id}`; // Automatyczne SKU
  }
}

// Mockowa baza produktów Samsung (F3 - Katalog produktów)
const products = [
  new Product(
    1,
    'Samsung Galaxy S24 Ultra',
    'S24 Ultra',
    'smartphone',
    5499,
    'Flagowy smartfon Samsung z aparatem 200MP i S Pen',
    {
      screen: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      camera: '200MP + 50MP + 12MP + 10MP',
      battery: '5000mAh'
    },
    '/images/s24-ultra.jpg',
    15
  ),
  new Product(
    2,
    'Samsung Galaxy S24',
    'S24',
    'smartphone',
    3999,
    'Kompaktowy flagowiec z AI',
    {
      screen: '6.2" Dynamic AMOLED 2X',
      processor: 'Exynos 2400',
      ram: '8GB',
      storage: '128GB',
      camera: '50MP + 12MP + 10MP',
      battery: '4000mAh'
    },
    '/images/s24.jpg',
    25
  ),
  new Product(
    3,
    'Samsung Galaxy Z Fold 5',
    'Z Fold 5',
    'smartphone',
    7999,
    'Składany smartfon premium',
    {
      screen: '7.6" Dynamic AMOLED 2X (rozłożony)',
      processor: 'Snapdragon 8 Gen 2',
      ram: '12GB',
      storage: '512GB',
      camera: '50MP + 12MP + 10MP',
      battery: '4400mAh'
    },
    '/images/z-fold5.jpg',
    8
  ),
  new Product(
    4,
    'Samsung Galaxy Buds2 Pro',
    'Buds2 Pro',
    'accessory',
    899,
    'Słuchawki bezprzewodowe z ANC',
    {
      type: 'TWS',
      anc: 'Tak',
      battery: '8h + 29h (etui)',
      bluetooth: '5.3',
      waterproof: 'IPX7'
    },
    '/images/buds2-pro.jpg',
    50
  ),
  new Product(
    5,
    'Samsung 45W Fast Charger',
    '45W Charger',
    'accessory',
    149,
    'Szybka ładowarka USB-C 45W',
    {
      power: '45W',
      ports: 'USB-C',
      cable: 'Dołączony 1m',
      compatibility: 'Galaxy S24/S23/S22 Ultra'
    },
    '/images/charger-45w.jpg',
    100
  )
];

module.exports = { Product, products };

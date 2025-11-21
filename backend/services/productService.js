// services/productService.js - Warstwa logiki biznesowej dla produktów

const { Product, products } = require('../models/Product');

class ProductService {
  // F3 - Pobieranie wszystkich produktów
  getAllProducts() {
    return products;
  }

  // F4 - Wyszukiwanie produktów po nazwie, modelu lub kategorii
  searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.model.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }

  // F5 - Filtrowanie produktów
  filterProducts(filters) {
    let filtered = [...products];

    // Filtrowanie po kategorii
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Filtrowanie po cenie (min-max)
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
    }

    // Filtrowanie po dostępności
    if (filters.inStock === 'true') {
      filtered = filtered.filter(p => p.stock > 0);
    }

    return filtered;
  }

  // Pobieranie pojedynczego produktu
  getProductById(id) {
    return products.find(p => p.id === parseInt(id));
  }

  // F10 - Dodawanie produktu (admin)
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

  // F10 - Edycja produktu (admin)
  updateProduct(id, updates) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      throw new Error('Produkt nie znaleziony');
    }
    products[index] = { ...products[index], ...updates };
    return products[index];
  }

  // F10 - Usuwanie produktu (admin)
  deleteProduct(id) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      throw new Error('Produkt nie znaleziony');
    }
    products.splice(index, 1);
    return { message: 'Produkt usunięty' };
  }
}

module.exports = new ProductService();

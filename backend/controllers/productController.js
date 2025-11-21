// controllers/productController.js - Kontroler produktów

const productService = require('../services/productService');

class ProductController {
  // F3 - Pobieranie wszystkich produktów
  getAllProducts(req, res) {
    try {
      const products = productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // F4 - Wyszukiwanie produktów
  searchProducts(req, res) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ error: 'Brak zapytania wyszukiwania' });
      }
      const products = productService.searchProducts(q);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // F5 - Filtrowanie produktów
  filterProducts(req, res) {
    try {
      const filters = req.query; // category, minPrice, maxPrice, inStock
      const products = productService.filterProducts(filters);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Pobieranie pojedynczego produktu
  getProductById(req, res) {
    try {
      const product = productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Produkt nie znaleziony' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // F10 - Dodawanie produktu (admin)
  addProduct(req, res) {
    try {
      const product = productService.addProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // F10 - Edycja produktu (admin)
  updateProduct(req, res) {
    try {
      const product = productService.updateProduct(req.params.id, req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // F10 - Usuwanie produktu (admin)
  deleteProduct(req, res) {
    try {
      const result = productService.deleteProduct(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();

// routes/productRoutes.js - Routing dla produktów (REST API)

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// GET /api/products - F3: Pobieranie wszystkich produktów
router.get('/', productController.getAllProducts.bind(productController));

// GET /api/products/search?q=galaxy - F4: Wyszukiwanie produktów
router.get('/search', productController.searchProducts.bind(productController));

// GET /api/products/filter?category=smartphone&minPrice=1000 - F5: Filtrowanie
router.get('/filter', productController.filterProducts.bind(productController));

// GET /api/products/:id - Pobieranie pojedynczego produktu
router.get('/:id', productController.getProductById.bind(productController));

// F10: Endpointy administracyjne (wymagają autoryzacji admin)
router.post('/', authenticateToken, isAdmin, productController.addProduct.bind(productController));
router.put('/:id', authenticateToken, isAdmin, productController.updateProduct.bind(productController));
router.delete('/:id', authenticateToken, isAdmin, productController.deleteProduct.bind(productController));

module.exports = router;

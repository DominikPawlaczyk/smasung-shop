// F3: Przeglądanie katalogu produktów
// F4: Wyszukiwanie produktów
// F5: Filtrowanie produktów

// Model Product
class Product {
  constructor(id, name, model, category, price, description, specs, image, stock) {
    this.id = id;
    this.name = name;
    this.model = model;
    this.category = category;
    this.price = price;
    this.description = description;
    this.specs = specs;
    this.image = image;
    this.stock = stock;
    this.sku = `SAM-${category.substring(0, 3).toUpperCase()}-${id}`;
  }
}

// Service - Logika biznesowa
class ProductService {
  // F3 - Pobieranie wszystkich produktów
  getAllProducts() {
    return products;
  }

  // F4 - Wyszukiwanie produktów
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

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
    }

    if (filters.inStock === 'true') {
      filtered = filtered.filter(p => p.stock > 0);
    }

    return filtered;
  }
}

// Controller
class ProductController {
  getAllProducts(req, res) {
    const products = productService.getAllProducts();
    res.status(200).json(products);
  }

  searchProducts(req, res) {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Brak zapytania wyszukiwania' });
    }
    const products = productService.searchProducts(q);
    res.status(200).json(products);
  }

  filterProducts(req, res) {
    const filters = req.query;
    const products = productService.filterProducts(filters);
    res.status(200).json(products);
  }
}

// Routes
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/filter', productController.filterProducts);

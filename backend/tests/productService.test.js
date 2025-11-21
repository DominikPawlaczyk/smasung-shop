// tests/productService.test.js - Testy dla serwisu produktów

const productService = require('../services/productService');
const { products } = require('../models/Product');

describe('ProductService - Testy jednostkowe', () => {

  // Test F3 - Przeglądanie katalogu produktów
  describe('Pobieranie wszystkich produktów', () => {
    
    test('powinien zwrócić wszystkie produkty', () => {
      const allProducts = productService.getAllProducts();
      
      expect(allProducts).toBeDefined();
      expect(Array.isArray(allProducts)).toBe(true);
      expect(allProducts.length).toBeGreaterThan(0);
    });

    test('każdy produkt powinien mieć wymagane pola', () => {
      const allProducts = productService.getAllProducts();
      const product = allProducts[0];
      
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined();
      expect(product.category).toBeDefined();
      expect(product.sku).toBeDefined();
    });
  });

  // Test F4 - Wyszukiwanie produktów
  describe('Wyszukiwanie produktów', () => {
    
    test('powinien znaleźć produkty po nazwie', () => {
      const results = productService.searchProducts('Galaxy');
      
      expect(results.length).toBeGreaterThan(0);
      results.forEach(product => {
        expect(product.name.toLowerCase()).toContain('galaxy');
      });
    });

    test('powinien znaleźć produkty po modelu', () => {
      const results = productService.searchProducts('S24');
      
      expect(results.length).toBeGreaterThan(0);
      results.forEach(product => {
        expect(
          product.name.toLowerCase().includes('s24') ||
          product.model.toLowerCase().includes('s24')
        ).toBe(true);
      });
    });

    test('powinien zwrócić pustą tablicę dla nieistniejącego produktu', () => {
      const results = productService.searchProducts('NieistniejącyProdukt123');
      
      expect(results).toEqual([]);
    });

    test('wyszukiwanie powinno być case-insensitive', () => {
      const resultsLower = productService.searchProducts('galaxy');
      const resultsUpper = productService.searchProducts('GALAXY');
      
      expect(resultsLower.length).toBe(resultsUpper.length);
    });
  });

  // Test F5 - Filtrowanie produktów
  describe('Filtrowanie produktów', () => {
    
    test('powinien filtrować po kategorii', () => {
      const filters = { category: 'smartphone' };
      const results = productService.filterProducts(filters);
      
      results.forEach(product => {
        expect(product.category).toBe('smartphone');
      });
    });

    test('powinien filtrować po minimalnej cenie', () => {
      const filters = { minPrice: 1000 };
      const results = productService.filterProducts(filters);
      
      results.forEach(product => {
        expect(product.price).toBeGreaterThanOrEqual(1000);
      });
    });

    test('powinien filtrować po maksymalnej cenie', () => {
      const filters = { maxPrice: 2000 };
      const results = productService.filterProducts(filters);
      
      results.forEach(product => {
        expect(product.price).toBeLessThanOrEqual(2000);
      });
    });

    test('powinien filtrować po zakresie cen', () => {
      const filters = { minPrice: 500, maxPrice: 5000 };
      const results = productService.filterProducts(filters);
      
      results.forEach(product => {
        expect(product.price).toBeGreaterThanOrEqual(500);
        expect(product.price).toBeLessThanOrEqual(5000);
      });
    });

    test('powinien filtrować tylko dostępne produkty', () => {
      const filters = { inStock: 'true' };
      const results = productService.filterProducts(filters);
      
      results.forEach(product => {
        expect(product.stock).toBeGreaterThan(0);
      });
    });

    test('powinien łączyć wiele filtrów', () => {
      const filters = {
        category: 'smartphone',
        minPrice: 3000,
        inStock: 'true'
      };
      const results = productService.filterProducts(filters);
      
      results.forEach(product => {
        expect(product.category).toBe('smartphone');
        expect(product.price).toBeGreaterThanOrEqual(3000);
        expect(product.stock).toBeGreaterThan(0);
      });
    });
  });

  // Test F10 - Zarządzanie produktami (admin)
  describe('Zarządzanie produktami', () => {
    
    test('powinien dodać nowy produkt', () => {
      const newProduct = {
        name: 'Test Product',
        model: 'TEST-001',
        category: 'smartphone',
        price: 2999,
        description: 'Testowy produkt',
        specs: { test: 'spec' },
        image: '/test.jpg',
        stock: 10
      };

      const result = productService.addProduct(newProduct);
      
      expect(result.id).toBeDefined();
      expect(result.name).toBe(newProduct.name);
      expect(result.sku).toContain('SAM-');
    });

    test('powinien zaktualizować istniejący produkt', () => {
      const productId = 1;
      const updates = { price: 4999, stock: 20 };
      
      const result = productService.updateProduct(productId, updates);
      
      expect(result.price).toBe(4999);
      expect(result.stock).toBe(20);
    });

    test('powinien zwrócić błąd przy aktualizacji nieistniejącego produktu', () => {
      expect(() => {
        productService.updateProduct(99999, { price: 100 });
      }).toThrow('Produkt nie znaleziony');
    });
  });

  // Test automatycznego generowania SKU
  describe('Automatyczne SKU', () => {
    
    test('SKU powinno być generowane automatycznie', () => {
      const allProducts = productService.getAllProducts();
      
      allProducts.forEach(product => {
        expect(product.sku).toMatch(/^SAM-[A-Z]{3}-\d+$/);
      });
    });

    test('SKU dla smartfona powinno zawierać "SMA"', () => {
      const smartphones = productService.filterProducts({ category: 'smartphone' });
      
      smartphones.forEach(product => {
        expect(product.sku).toContain('SAM-SMA-');
      });
    });

    test('SKU dla akcesoriów powinno zawierać "ACC"', () => {
      const accessories = productService.filterProducts({ category: 'accessory' });
      
      accessories.forEach(product => {
        expect(product.sku).toContain('SAM-ACC-');
      });
    });
  });
});

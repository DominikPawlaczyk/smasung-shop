// pages/AdminDashboard.js - Panel administracyjny
// F10, F11 - Zarządzanie produktami i zamówieniami

import React, { useState, useEffect } from 'react';
import { getProducts, getAllOrders, addProduct, updateProduct, deleteProduct, updateOrderStatus } from '../services/api';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products'); // 'products' lub 'orders'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'products') {
        const data = await getProducts();
        setProducts(data);
      } else {
        const data = await getAllOrders();
        setOrders(data);
      }
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
    } finally {
      setLoading(false);
    }
  };

  // F10 - Usuwanie produktu
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten produkt?')) return;
    
    try {
      await deleteProduct(id);
      alert('Produkt usunięty');
      loadData();
    } catch (error) {
      alert('Błąd usuwania produktu');
    }
  };

  // F11 - Zmiana statusu zamówienia
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      alert('Status zamówienia zaktualizowany');
      loadData();
    } catch (error) {
      alert('Błąd aktualizacji statusu');
    }
  };

  return (
    <div className="dashboard-page admin-dashboard">
      <h1>Panel Administracyjny</h1>

      {/* Zakładki */}
      <div className="admin-tabs">
        <button 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Produkty
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Zamówienia
        </button>
      </div>

      {loading ? (
        <p>Ładowanie...</p>
      ) : (
        <>
          {/* F10 - Zarządzanie produktami */}
          {activeTab === 'products' && (
            <div className="admin-section">
              <h2>Zarządzanie produktami</h2>
              <div className="products-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nazwa</th>
                      <th>Model</th>
                      <th>Kategoria</th>
                      <th>Cena</th>
                      <th>Stan</th>
                      <th>Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.model}</td>
                        <td>{product.category}</td>
                        <td>{product.price} zł</td>
                        <td>{product.stock}</td>
                        <td>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="delete-btn-small"
                          >
                            Usuń
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* F11 - Zarządzanie zamówieniami */}
          {activeTab === 'orders' && (
            <div className="admin-section">
              <h2>Zarządzanie zamówieniami</h2>
              <div className="orders-table">
                {orders.length === 0 ? (
                  <p>Brak zamówień</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Użytkownik</th>
                        <th>Data</th>
                        <th>Produkty</th>
                        <th>Suma</th>
                        <th>Status</th>
                        <th>Akcje</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>ID: {order.userId}</td>
                          <td>{new Date(order.createdAt).toLocaleDateString('pl-PL')}</td>
                          <td>{order.items.length}</td>
                          <td>{order.totalPrice} zł</td>
                          <td>
                            <select 
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="status-select"
                            >
                              <option value="pending">Oczekujące</option>
                              <option value="paid">Opłacone</option>
                              <option value="shipped">Wysłane</option>
                              <option value="delivered">Dostarczone</option>
                              <option value="cancelled">Anulowane</option>
                            </select>
                          </td>
                          <td>
                            <button className="view-btn-small">Szczegóły</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;

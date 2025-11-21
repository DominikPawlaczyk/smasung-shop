// pages/UserDashboard.js - Panel użytkownika
// F9 - Historia zamówień i ustawienia konta

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserOrders, getUserProfile, updateUserProfile } from '../services/api';
import '../styles/Dashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({ firstName: '', lastName: '' });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pobieranie danych użytkownika i zamówień
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const [ordersData, profileData] = await Promise.all([
        getUserOrders(),
        getUserProfile()
      ]);
      setOrders(ordersData);
      setProfile({ firstName: profileData.firstName, lastName: profileData.lastName });
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
    } finally {
      setLoading(false);
    }
  };

  // Obsługa aktualizacji profilu
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(profile);
      alert('Profil zaktualizowany!');
      setEditMode(false);
    } catch (error) {
      alert('Błąd aktualizacji profilu');
    }
  };

  // Status zamówienia po polsku
  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Oczekujące',
      paid: 'Opłacone',
      shipped: 'Wysłane',
      delivered: 'Dostarczone',
      cancelled: 'Anulowane'
    };
    return labels[status] || status;
  };

  if (loading) {
    return <div className="dashboard-page">Ładowanie...</div>;
  }

  return (
    <div className="dashboard-page">
      <h1>Moje konto</h1>

      {/* Sekcja profilu */}
      <div className="dashboard-section">
        <h2>Dane profilu</h2>
        {editMode ? (
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="form-group">
              <label>Imię:</label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Nazwisko:</label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="save-btn">Zapisz</button>
            <button type="button" onClick={() => setEditMode(false)} className="cancel-btn">
              Anuluj
            </button>
          </form>
        ) : (
          <div className="profile-info">
            <p><strong>Imię:</strong> {user.firstName}</p>
            <p><strong>Nazwisko:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={() => setEditMode(true)} className="edit-btn">
              Edytuj profil
            </button>
          </div>
        )}
      </div>

      {/* Sekcja historii zamówień */}
      <div className="dashboard-section">
        <h2>Historia zamówień</h2>
        {orders.length === 0 ? (
          <p>Nie masz jeszcze żadnych zamówień</p>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>Zamówienie #{order.id}</h3>
                  <span className={`order-status status-${order.status}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>
                <p><strong>Data:</strong> {new Date(order.createdAt).toLocaleDateString('pl-PL')}</p>
                <p><strong>Produkty:</strong> {order.items.length}</p>
                <p><strong>Dostawa:</strong> {order.shippingMethod}</p>
                <p><strong>Płatność:</strong> {order.paymentMethod}</p>
                <p className="order-total"><strong>Suma:</strong> {order.totalPrice} zł</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

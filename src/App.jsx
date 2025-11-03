import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import MainPage from './assets/Pages/Canvas/MainPage';
import ShopPage from './assets/Pages/Shop/ShopPage';
import Login from './assets/Pages/Sign/Login';
import SignUp from './assets/Pages/Sign/SignUp';
import LandingPage from './assets/Pages/LandingPage/LandingPage';
import Main from './assets/Pages/Main/Main';
import History from './assets/Pages/Shop/History/HistoryPage';
import Cart from './assets/Pages/Shop/Cart/CartPage';
import Wishlist from './assets/Pages/Shop/Save/Wishlist';

// ProtectedRoute: checks token instead of isLoggedIn
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* show landing first */}
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* authentication pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* protected pages */}
        <Route path="/main" element={<ProtectedRoute element={<Main />} />} />
        <Route path="/canvas" element={<ProtectedRoute element={<MainPage />} />} />
        <Route path="/shop" element={<ProtectedRoute element={<ShopPage />} />} />
        <Route path="/history" element={<ProtectedRoute element={<History />} />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route path="/save" element={<ProtectedRoute element={<Wishlist />} />} />

        {/* unknown routes go to landing */}
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

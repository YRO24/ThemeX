import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css"
import MainPage from './assets/Pages/Canvas/MainPage';
import ShopPage from './assets/Pages/Shop/ShopPage';
import Login from './assets/Pages/Sign/Login';
import SignUp from './assets/Pages/Sign/SignUp';
import LandingPage from './assets/Pages/LandingPage/LandingPage';
import Main from './assets/Pages/Main/Main';
import History from './assets/Pages/Shop/History/HistoryPage';
import Cart from './assets/Pages/Shop/Cart/CartPage';
import Save from './assets/Pages/Shop/Save/Wishlist';

function App() {
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/canvas" replace />} />
         <Route path="/main" element={<Main />} />
         <Route path="/history" element={<History />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/save" element={<Save />} />
         <Route path="/history" element={<History />} />

        <Route path="/landing" element={<LandingPage />} />
        <Route path="/canvas" element={<MainPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/canvas" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
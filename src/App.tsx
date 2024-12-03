import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import PageLayout from './pages/PageLayout';

const App = () => (
  <CartProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PageLayout children={<HomePage/>} />} />
        <Route path="/product/:id" element={<PageLayout children={<ProductDetailPage />} />} />
        <Route path="/cart" element={< PageLayout children={<CartPage />} />} />
      </Routes>
    </Router>
  </CartProvider>
);

export default App;

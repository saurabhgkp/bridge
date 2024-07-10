// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './Component/Navbar';
import Dashboard from './Component/Dashboard';
import CryptoDetail from './Component/CryptoDetail';
import CryptoBuy from './Component/CryptoBuy';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/list-detail/:id" element={<CryptoDetail />} />
        <Route path="/list-buy/:id" element={<CryptoBuy />} />
      </Routes>
    </Router>
  );
}

export default App;

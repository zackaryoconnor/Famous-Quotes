import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CreateQuote from './components/CreateQuote';
import Home from './components/Home';


function App() {

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addQuote" element={<CreateQuote />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

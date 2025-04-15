import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CreateQuote from './components/CreateQuote';
import Quotes from './components/Quotes/Quotes';
import Home from './components/Home';
import {useEffect, useState} from 'react'


function App() {
const [userSession, setUserSession] = useState({username: 'cwan7', id: '67fd2662e623cd6fbc777fd3'})

useEffect(() => {
  const getSession = async () => {
    const session = await (await fetch('http://localhost:3000/auth/session')).json()
    setUserSession(session)
  }
  getSession();
}, [])
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addQuote" element={<CreateQuote session={userSession}/>} />
          <Route path="/quotes" element={<Quotes/>}/>
        </Routes>
    </Router>
  )
}

export default App

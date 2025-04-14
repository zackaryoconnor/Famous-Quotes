import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Quotes from './Quotes/Quotes'; // zack

const Navbar = () => {
    return (
        <Router>
            <nav className='flex items-center gap-12 justify-center bg-blue-500 text-white'>
                <Link className='hover:text-blue-950' to="/">Home</Link>
                <Link className='hover:text-blue-950' to="/quotes">Quotes</Link>
                <Link className='hover:text-blue-950' to="/addQuote">Add a Quote</Link>
                <Link className='hover:text-blue-950' to="/signInSignUp">Sign In / Sign Up</Link>
            </nav>

            <Routes>
                {<Route path="/" element={<Home />} />}
                {<Route path="/quotes" element={<Quotes />} />} // zack
            </Routes>
        </Router>
    )
}

export default Navbar
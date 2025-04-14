import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-center gap-12 bg-blue-500 text-white py-4">
            <Link className="hover:text-blue-950" to="/">Home</Link>
            {/* <Link className="hover:text-blue-950" to="/quotes">Quotes</Link> */}
            <Link className="hover:text-blue-950" to="/addQuote">Add a Quote</Link>
            {/* <Link className="hover:text-blue-950" to="/signInSignUp">Sign In / Sign Up</Link> */}
        </nav>
    );
}

export default Navbar
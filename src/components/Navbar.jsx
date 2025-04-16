import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ session, setSession }) => {
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // this is going to be needed for cookies and maintaining session
      });

      if (response.ok) {
        setSession(null); // clear the session
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="flex items-center justify-center gap-12 bg-blue-500 text-white py-4">
      <Link className="hover:text-blue-950" to="/">Home</Link>
      <Link className="hover:text-blue-950" to="/quotes">Quotes</Link>
      <Link className="hover:text-blue-950" to="/game">Play Game</Link>
      {/* Register / Login links based on session state */}
      {!session ? (
        <>
          <Link className="hover:text-blue-950" to="/register">
            Register
          </Link>
          <Link className="hover:text-blue-950" to="/login">
            Login
          </Link>
        </>
      ) : (
        <>
          <Link className="hover:text-blue-950" to="/addQuote">Add a Quote</Link>
          <form onSubmit={handleLogout}>
            <button
              type="submit"
              className="bg-transparent hover:text-blue-950 cursor-pointer"
            >
              Logout
            </button>
          </form>
        </>
      )}
    </nav>
  );
};

export default Navbar;

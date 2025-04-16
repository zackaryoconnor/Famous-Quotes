import React, { useState } from "react";
import { Link } from "react-router-dom";
import LinkComponent from "./Link";


const Navbar = ({ session, setSession }) => {
  const [showSidebar, setShowSiderbar] = useState(false);
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

  const links = [
    { text: "Home", link: "/" },
    { text: "Quotes", link: "/quotes" },
    { text: "Play Game", link: "/game" },
  ];

  return (
    <nav className="sm:bg-primary text-accent-light bg-primary relative flex items-center justify-between gap-12 px-14 py-4">
      <h1 className="text-3xl">Quotefolio</h1>

      <div id="links" className="flex gap-7 text-xl">
        {links.map((item) => {
          return (
            <LinkComponent text={item.text} link={item.link}/>
          );
        })}
        {session ? <LinkComponent text="Add Quote" link="/addQuote" className={`hover:text-blue-950" to="/addQuote`}/> : <></>}
        {session ? <LinkComponent text="Register" link="/register" className= {`hover:text-blue-950" to="/register`}/> : <></>}
        {session ? <LinkComponent text="Add Quote" link="/addQuote" className={`hover:text-blue-950" to="/addQuote`}/> : <></>}
        
        
        <LinkComponent text="Login" link="/login" className={`${session ? "hidden" : ""} hover:text-blue-950" to="/login`}/>
        
        {/* <form >
          <button
            type="submit"
            className="cursor-pointer bg-transparent hover:text-blue-950"
          >
            Logout
          </button>
        </form> */}

        {/* Register / Login links based on session state */}
        <button
          onClick={() => {
            setShowSiderbar(!showSidebar);
          }}
          className="material-symbols-outlined cursor-pointer navBreakPoint:!hidden"
        >
          menu
        </button>
      </div>
      {/* Dropdown */}
      {showSidebar ? (
        <>
          <div
            id="Dropdown"
            className={`items-star bg-primary absolute top-full right-0 z-20 flex h-screen w-[200px] flex-col gap-4 p-5 opacity-80 sm:!hidden`}
          >
            {links.map((item) => {
              return (
                <Link
                  className="hover:underline hover:decoration-2 hover:underline-offset-8 sm:!block"
                  to={item.link}
                >
                  {item.text}
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import LinkComponent from "./Link";

const Navbar = ({ session, setSession }) => {
  const navigateTo = useNavigate();
  const [showSidebar, setShowSiderbar] = useState(false);
  const handleLogout = async (e) => {

    e.preventDefault();

    try {
      const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000"
      const response = await fetch(`${api_url}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // this is going to be needed for cookies and maintaining session
      });

      if (response.ok) {
        setSession(null); // clear the session
        navigateTo("/home"); // send home
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // I used this approach to manage links in one place, so I can easily reuse them and keep things consistent. 
  // It's a programming best practice for maintaining a single source of truth. I knew I'd need to reuse these links
  // across different parts of the app, so it's cleaner and more efficient this way.
  const links = [
    // Static Links
    ...[
      { text: "Home", link: "/" },
      { text: "Quotes", link: "/quotes" },
      { text: "Play Game", link: "/game" },
    ].map((item, index) => (
      <Link key={index} to={item.link}>
        <LinkComponent text={item.text} />
      </Link>
    )),

    // Conditional Links
    ...(session
      ? [
          <Link key="addQuote" to="/addQuote">
            <LinkComponent text="Add Quote" />
          </Link>,
            <button onClick={handleLogout} type="submit" className="cursor-pointer">
              <LinkComponent text="Logout" />
            </button>
        ]
      : [
          <Link key="register" to="/register">
            <LinkComponent text="Register" />
          </Link>,
          <Link key="login" to="/login">
            <LinkComponent text="Login" />
          </Link>,
        ]),
  ];


  return (
    <nav className="sm:bg-primary text-accent-light bg-primary relative flex items-center justify-between gap-12 px-14 py-4">
      <h1 className="text-3xl">Quotefolio</h1>

      <div id="links" className="flex gap-7 text-xl">
        {/* Links */}
        {links.map((link, index) => {
          return (
            <div className="navBreakPoint:!block hidden" key={index}>
              {link}
            </div>
          );
        })}

        {/* Hamburger */}
        <button // <---- This is a svg/icon we got from google
          onClick={() => {
            setShowSiderbar(!showSidebar);
          }}
          className="material-symbols-outlined navBreakPoint:!hidden cursor-pointer"
        >
          menu
        </button>
      </div>
      {/* Dropdown */}
      {showSidebar ? (
        <>
          <div
            id="Dropdown"
            className={`items-star bg-primary navBreakPoint:!hidden absolute top-full right-0 z-20 flex h-screen w-[200px] flex-col gap-4 p-5 opacity-80`}
          >
            {/* Links */}
            {links.map((link, index) => {
              return <div key={index}>{link}</div>;
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

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
          <form key="logout" onSubmit={handleLogout}>
            <button type="submit" className="cursor-pointer">
              <LinkComponent text="Logout" />
            </button>
          </form>,
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
        <button
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

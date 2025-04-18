// src/App.jsx
import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
// Components
import Navbar from "./components/Navbar";
// Pages
import Home from "./pages/Home";
import CreateQuote from "./pages/CreateQuote";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Quotes from "./components/Quotes/Quotes";
import Game from "./pages/Game";

const RedirectToHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home"); // basically sends the user back to "/home" whenever they reach the "/" route
  }, [navigate]);

  return null;
};

function App() {
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await (
        await fetch(`${api_url}/auth/session`, {
          method: "GET",
          credentials: "include", // THIS is crucial for session!
        })
      ).json();
      const session = response.session;
      setUserSession(session);
    };
    getSession(); // this fetches the session every time location changes AND on initial page load;
  }, []);

  return (
    <Router>
      <Navbar session={userSession} setSession={setUserSession} />
      <Routes>
        {/* "/" root route */}
        <Route path="/" element={<RedirectToHome />} />
        {/* home route */}
        <Route path="/home" element={<Home />} />
        {/* quotes */}
        <Route path="/quotes" element={<Quotes session={userSession} />} />
        {/* add quote */}
        <Route
          path="/addQuote"
          element={<CreateQuote session={userSession} />}
        />
        {/* Register / login */}
        <Route path="/register" element={<Register session={userSession} />} />
        <Route
          path="/login"
          element={<Login session={userSession} setSession={setUserSession} />}
        />
        <Route path="/game" element={<Game session={userSession} />} />
      </Routes>
    </Router>
  );
}

export default App;

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Folio.</div>

      <ul className="nav-links">
        <li>
          <Link to="/cafe">Menu</Link>
        </li>

        <li>
          <Link to="/discover">Discover</Link>
        </li>

        <li>
          <a href="#about">About</a>
        </li>

        <li>
          <a href="#hours">Visit</a>
        </li>
      </ul>

      <div className="nav-right">
        <Link to="/login" className="user-save">
          Admin Login
        </Link>

        <button className="nav-toggle" onClick={toggleTheme}>
          {dark ? "🌙" : "☀"}
        </button>
      </div>
    </nav>
  );
}

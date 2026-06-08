import { useState } from "react";

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
          <a href="#menu">Menu</a>
        </li>

        <li>
          <a href="/discover">Discover</a>
        </li>

        <li>
          <a href="#about">About</a>
        </li>

        <li>
          <a href="#hours">Visit</a>
        </li>
      </ul>

      <div className="nav-right">
        <a href="/login" className="user-save">
          Admin Login
        </a>

        <button className="nav-toggle" onClick={toggleTheme}>
          {dark ? "🌙" : "☀"}
        </button>
      </div>
    </nav>
  );
}

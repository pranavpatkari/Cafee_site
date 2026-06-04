import { useState, useEffect } from "react";
import { auth, provider } from "../services/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);

  // 🔥 Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      console.log("🔥 AUTH USER:", u);
    });

    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // 🚪 LOGOUT
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Folio.</div>

      <ul className="nav-links">
        <li><a href="#menu">Menu</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#hours">Visit</a></li>
      </ul>

      <div className="nav-right">

        {!user ? (
          <button className="user-save" onClick={handleLogin}>
            Continue with Google
          </button>
        ) : (
          <div className="user-display">
            👤 {user.displayName}
            <button onClick={handleLogout}>🚪</button>
          </div>
        )}

        <button className="nav-toggle" onClick={toggleTheme}>
          {dark ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

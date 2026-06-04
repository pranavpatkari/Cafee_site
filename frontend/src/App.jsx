import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// Cafe UI
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart";
import About from "./components/About";
import Hours from "./components/Hours";

// Auth + Dashboard
import LoginPage from "./dashboard/pages/LoginPage";
import ProtectedRoute from "./dashboard/components/ProtectedRoute";
import DashboardPage from "./dashboard/pages/DashboardPage";

// ☕ Cafe Page
function CafeSite() {
  return (
    <>
      <Navbar />
      <Hero />
      <Menu />
      <Cart />
      <About />
      <Hours />
    </>
  );
}

// 🚀 Landing → Cafe
function LandingWrapper() {
  const navigate = useNavigate();

  const goToCafe = () => {
    navigate("/cafe");
  };

  return <Landing onEnter={goToCafe} />;
}

// Main App
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingWrapper />} />
        <Route path="/cafe" element={<CafeSite />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

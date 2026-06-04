import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

// Cafe UI
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart";
import About from "./components/About";
import Hours from "./components/Hours";

// Auth + Dashboard
const LoginPage = lazy(() =>
  import("./dashboard/pages/LoginPage")
);

const ProtectedRoute = lazy(() =>
  import("./dashboard/components/ProtectedRoute")
);

const DashboardPage = lazy(() =>
  import("./dashboard/pages/DashboardPage")
);
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
    <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </Router>
  );
}

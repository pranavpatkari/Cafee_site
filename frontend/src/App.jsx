import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Cafe UI
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart";
import About from "./components/About";
import Hours from "./components/Hours";

// Lazy Loaded Pages
const LoginPage = lazy(() =>
  import("./dashboard/pages/LoginPage")
);

const ProtectedRoute = lazy(() =>
  import("./dashboard/components/ProtectedRoute")
);

const DashboardPage = lazy(() =>
  import("./dashboard/pages/DashboardPage")
);

const DiscoverPage = lazy(() =>
  import("./pages/DiscoverPage")
);

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

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route
            path="/"
            element={<CafeSite />}
          />

          <Route
            path="/cafe"
            element={<CafeSite />}
          />

          <Route
            path="/discover"
            element={<DiscoverPage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

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

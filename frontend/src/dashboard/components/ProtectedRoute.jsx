import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      console.log("Logged in user:", u?.email); // 🔍 debug
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  // ⏳ Wait for Firebase auth to load
  if (user === undefined) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  // 🔐 Allowed admin emails
  const allowedEmails = [
    "izumitanjirou@gmail.com",
    "uluffy06@gmail.com"
  ];

  // 🚫 Block unauthorized users
  if (!user || !allowedEmails.includes(user.email)) {
    return <Navigate to="/login" />;
  }

  // ✅ Allow access
  return children;
}

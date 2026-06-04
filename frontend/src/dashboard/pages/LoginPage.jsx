import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../services/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle();

      console.log("Logged in:", user.email);

      // 🚀 Always go to admin
      // ProtectedRoute will handle auth check
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "120px" }}>
      <h2>Admin Login</h2>

      <button
        onClick={handleLogin}
        style={{
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#c58a3d",
          color: "white",
          cursor: "pointer",
          fontSize: "1rem"
        }}
      >
        Continue with Google
      </button>
    </div>
  );
}

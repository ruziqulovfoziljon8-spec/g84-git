import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      navigate("/dashboard");
    } else {
      setError("Login yoki parol noto‘g‘ri!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "380px",
          padding: "40px 35px",
          background: "rgba(17, 24, 39, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "white", marginBottom: "5px" }}>
            Welcome Back 👋
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            Sign in to continue
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ color: "#9ca3af", fontSize: "14px" }}>Username</label>
          <input
            type="text"
            placeholder="Enter your login..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #374151",
              backgroundColor: "#1f2937",
              color: "white",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ color: "#9ca3af", fontSize: "14px" }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #374151",
              backgroundColor: "#1f2937",
              color: "white",
              outline: "none",
            }}
          />
        </div>

        {error && (
          <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Kirish
        </button>

        <div
          style={{
            marginTop: "10px",
            paddingTop: "15px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#d1d5db",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            Demo Credentials
          </p>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: "12px",
              borderRadius: "10px",
              fontSize: "14px",
              color: "#e5e7eb",
            }}
          >
            <p>
              Username: <span style={{ color: "#f472b6" }}>admin</span>
            </p>
            <p>
              Password: <span style={{ color: "#f472b6" }}>admin123</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

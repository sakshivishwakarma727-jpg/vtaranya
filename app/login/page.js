"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  // -------------------------------
  // STATES
  // -------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // -------------------------------
  // VALIDATION
  // -------------------------------
  const validateInputs = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Enter a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return null;
  };

  // -------------------------------
  // HANDLE LOGIN
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const error = validateInputs();
    if (error) {
      setMessage(error);
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) return setMessage(data.error || "Login failed");

    setMessage("Login successful...");

    if (redirect === "homeThenReport") {
      router.push("/home");
      setTimeout(() => router.push("/report"), 900);
      return;
    }

    if (redirect === "report") {
      router.push("/report");
      return;
    }

    router.replace("/home");
  };

  return (
    <div style={styles.wrapper}>
      {/* -------- LOGO + TITLE -------- */}
      <div style={styles.titleSection}>
        <img src="/logo.png" alt="Logo" style={styles.logoImg} />
        <h1 style={styles.title}>VTARANYA</h1>
      </div>

      <p style={styles.description}>
        Report environmental issues efficiently. Your reports reach the right
        authority while keeping your data secure.
      </p>

      {/* -------- LOGIN FORM -------- */}
      <form style={styles.form} onSubmit={handleSubmit}>
        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD WITH SHOW/HIDE */}
        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
            required
          />

          <span
            style={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* LOGIN BUTTON */}
        <button type="submit" style={styles.button}>Login</button>

        {/* LINKS */}
        <div style={styles.links}>
          <a href="/forgot-password" style={styles.link}>Forgot Password?</a>
          <span style={{ color: "#999" }}> | </span>
          <a href="/register" style={styles.link}>Sign Up</a>
        </div>

        {/* VALIDATION / SUCCESS MESSAGE */}
        {message && (
          <p style={{
            ...styles.message,
            color: message.includes("successful") ? "green" : "red"
          }}>
            {message}
          </p>
        )}
      </form>

      <footer style={styles.footer}>
        © 2025 VTARANYA — Protecting Nature Together
      </footer>
    </div>
  );
}

/* --------------------------------------
   VTARANYA STYLES (INLINE, SAME FORMAT)
-----------------------------------------*/

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f7f9f6",
    fontFamily: "'Trebuchet MS', Arial, sans-serif",
    padding: "40px 20px 20px 20px",
  },

  titleSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginTop: "50px",
    marginBottom: "15px",
  },

  logoImg: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #bfa14b",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#276938",
    textShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },

  description: {
    fontSize: "16px",
    color: "#444",
    textAlign: "center",
    maxWidth: "600px",
    marginBottom: "40px",
    lineHeight: "1.6",
  },

  form: {
    background: "#ffffff",
    padding: "30px 25px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "380px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    marginTop: "40px",
  },

  input: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  },

  passwordWrapper: {
  position: "relative",
  width: "100%",
  marginBottom: "15px",
},

togglePassword: {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#276938",
  fontWeight: "600",
  userSelect: "none",
},


  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#276938",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },

  links: {
    marginTop: "15px",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },

  link: {
    color: "#276938",
    textDecoration: "underline",
    cursor: "pointer",
  },

  message: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "500",
  },

  footer: {
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
    marginTop: "auto",
    paddingBottom: "20px",
  },
};

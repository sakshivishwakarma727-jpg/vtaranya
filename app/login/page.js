"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // REQUIRED FOR COOKIES
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) return setMessage(data.error || "Login failed");

    setMessage("Login successful..");

    const searchParams = new URLSearchParams(window.location.search);
    const redirect = searchParams.get("redirect");

// 1️⃣ Coming from landing page:
if (redirect === "homeThenReport") {
  router.push("/home");

  setTimeout(() => {
    router.push("/report");
  }, 1000);

  return;
}

// 2️⃣ Normal protected redirect
if (redirect === "report") {
  router.push("/report");
  return;
}

// 3️⃣ Default login redirect
router.push("/home");


  }; // ✅ FIXED — THIS WAS MISSING

  return (
    <div style={styles.wrapper}>
      <div style={styles.titleSection}>
        <img src="/logo.png" alt="Logo" style={styles.logoImg} />
        <h1 style={styles.title}>VTARANYA</h1>
      </div>

      <p style={styles.description}>
        Report environmental issues efficiently. Our system ensures your reports
        reach the right authority while keeping your data secure.
      </p>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={styles.button}>Login</button>

        <div style={styles.links}>
          <a href="/forgot-password" style={styles.link}>
            Forgot Password?
          </a>
          <span style={{ color: "#999" }}> | </span>
          <a href="/register" style={styles.link}>
            Sign Up
          </a>
        </div>

        {message && <p style={styles.message}>{message}</p>}
      </form>

      <footer style={styles.footer}>
        © 2025 VTARANYA — Protecting Nature Together
      </footer>
    </div>
  );
} // ✅ FIXED — THIS WAS MISSING


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
    color: "red",
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

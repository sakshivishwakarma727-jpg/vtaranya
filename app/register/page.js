"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) return setMessage(data.error || "Registration failed");

      setMessage("Registration successful! Redirecting...");
      router.push("/login");
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again.");
    }
    router.push("/home?redirect=" + searchParams.get("redirect"));

  };

  return (
    <div style={styles.wrapper}>
      
      {/* TITLE & LOGO */}
      <div style={styles.titleSection}>
        <img src="/logo.png" alt="Logo" style={styles.logoImg} />
        <h1 style={styles.title}>VTARANYA</h1>
      </div>

      {/* DESCRIPTION */}
      <p style={styles.description}>
        Create an account to report environmental issues responsibly. Your data is safe, and reports reach the right authority .
      </p>

      {/* REGISTER FORM */}
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          placeholder="Create Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={styles.button}>Sign Up</button>

        <div style={styles.links}>
          <a href="/login" style={{ color: "#999" }}>Already have an account? </a>
          <a href="/login" style={styles.link}>Sign In</a>
        </div>

        {message && <p style={styles.message}>{message}</p>}
      </form>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2025 VTARANYA — Protecting Nature Together
      </footer>
    </div>
    
  );
  
}


const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f7f9f6", // soft light background
    fontFamily: "'Trebuchet MS', Arial, sans-serif",
    color: "#333",
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
    width: "50px",
    height: "50px",
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
    transition: "all 0.3s ease",
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
    transition: "all 0.3s ease",
  },

  links: {
    marginTop: "15px",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    flexWrap: "wrap",
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
  },

  "@media (max-width: 600px)": {
    title: { fontSize: "28px" },
    description: { fontSize: "15px" },
    form: { padding: "25px 20px", width: "90%" },
  },
};

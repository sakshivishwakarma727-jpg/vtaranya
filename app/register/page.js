"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");

  // ---------------------------
  // VALIDATION
  // ---------------------------
  const validateForm = () => {
    const { name, email, password, confirmPassword } = form;

    if (name.trim().length < 3)
      return "Name must be at least 3 characters.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return "Enter a valid email address.";

    const passRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passRegex.test(password))
      return "Password must be 8+ chars & include uppercase, lowercase, number, symbol.";

    if (password !== confirmPassword)
      return "Passwords do not match.";

    return null;
  };

  // ---------------------------
  // SUBMIT
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const error = validateForm();
    if (error) return setMessage(error);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) return setMessage(data.error || "Registration failed");

      setMessage("Registration successful! Redirecting...");

      if (res.ok) {
        router.push("/home"); // goes to home automatically
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again.");
    }
  };

  // ---------------------------
  // UI RETURN
  // ---------------------------
  return (
    <div style={styles.wrapper}>
      {/* Title */}
      <div style={styles.titleSection}>
        <img src="/logo.png" alt="Logo" style={styles.logoImg} />
        <h1 style={styles.title}>VTARANYA</h1>
      </div>

      <p style={styles.description}>Create an account to report issues responsibly.</p>

      <form style={styles.form} onSubmit={handleSubmit}>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          style={styles.input}
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        {/* PASSWORD */}
        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            style={styles.input}
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />
          <span
            style={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <div style={styles.passwordWrapper}>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            style={styles.input}
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
          />
          <span
            style={styles.togglePassword}
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "Hide" : "Show"}
          </span>
        </div>

        {/* SUBMIT */}
        <button style={styles.button}>Sign Up</button>

        {/* LINK */}
        <div style={styles.links}>
          <span style={{ color: "#777" }}>Already have an account?</span>
          <a href="/login" style={styles.link}>Sign In</a>
        </div>

        {message && <p style={styles.message}>{message}</p>}
      </form>

      <footer style={styles.footer}>
        © 2025 VTARANYA — Protecting Nature Together
      </footer>
    </div>
  );
}

// ---------------------------
// STYLES
// ---------------------------
const styles = {
  wrapper: {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "#f2f8f3",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  titleSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "40px",
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
  },

  description: {
    maxWidth: "500px",
    textAlign: "center",
    marginTop: "15px",
    color: "#444",
    lineHeight: 1.5,
  },

  form: {
    marginTop: "30px",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
  },

  passwordWrapper: {
    position: "relative",
    width: "100%",
  },

  togglePassword: {
    position: "absolute",
    right: "12px",
    top: "12px",
    cursor: "pointer",
    color: "#276938",
    fontWeight: "600",
    userSelect: "none",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#276938",
    border: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },

  links: {
    marginTop: "12px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    gap: "6px",
  },

  link: {
    color: "#276938",
    fontWeight: "600",
    textDecoration: "underline",
  },

  message: {
    marginTop: "12px",
    textAlign: "center",
    color: "red",
  },

  footer: {
    marginTop: "auto",
    fontSize: "14px",
    color: "#666",
  },
};

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage({ user }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light");
  const [message, setMessage] = useState("");

  // -------------------------------
  // Form Validation
  // -------------------------------
  const validateForm = () => {
    const { name, email, password, confirmPassword } = form;
    if (!name || name.trim().length < 3) return "Name must be at least 3 characters.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Enter a valid email.";

    if (password) {
      if (password.length < 6) return "Password must be at least 6 characters.";
      if (password !== confirmPassword) return "Passwords do not match.";
    }

    return null;
  };

  // -------------------------------
  // Handle Save Changes
  // -------------------------------
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    const error = validateForm();
    if (error) return setMessage(error);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, notifications, language, theme }),
      });
      const data = await res.json();
      if (!res.ok) return setMessage(data.error || "Update failed");

      setMessage("Settings updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Settings</h2>

      {/* About Us */}
      <section style={styles.section}>
        <h3 style={styles.sectionHeading}>About Us</h3>
        <p style={styles.sectionText}>
          VTARANYA is dedicated to protecting the environment by allowing users to report environmental issues efficiently and securely.
        </p>
      </section>

      {/* Profile Settings */}
      <section style={styles.section}>
        <h3 style={styles.sectionHeading}>Profile Settings</h3>
        <form style={styles.form} onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={styles.input}
            required
          />
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={styles.input}
            />
            <span style={styles.togglePassword} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>Save Changes</button>
        </form>
      </section>

      {/* Preferences */}
      <section style={styles.section}>
        <h3 style={styles.sectionHeading}>Preferences</h3>

        <div style={styles.prefRow}>
          <span>Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>

        <div style={styles.prefRow}>
          <span>Language</span>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.select}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        <div style={styles.prefRow}>
          <span>Theme</span>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} style={styles.select}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </section>

      {/* Logout */}
      <section style={styles.section}>
        <button style={styles.logoutButton} onClick={() => router.push("/login")}>
          Logout
        </button>
      </section>

      {message && <p style={{ ...styles.message, color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}
    </div>
  );
}

// -------------------------
// STYLES
// -------------------------
const styles = {
  wrapper: {
    maxWidth: "600px",
    margin: "0 auto",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#276938",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sectionHeading: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#276938",
  },
  sectionText: {
    fontSize: "14px",
    color: "#555",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
    width: "100%",
  },
  passwordWrapper: {
    position: "relative",
    width: "100%",
  },
  togglePassword: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#276938",
    fontWeight: "600",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#276938",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  prefRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  select: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  logoutButton: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#e74c3c",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    fontWeight: "500",
    marginTop: "10px",
  },
};

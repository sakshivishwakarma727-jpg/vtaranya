"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SettingsPage() {
  const router = useRouter();

  // Logout function — clears cookie & redirects
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div style={styles.wrapper}>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <Image 
          src="/vtaranya-logo.png"
          width={120}
          height={120}
          alt="VTARANYA Logo"
          style={{ borderRadius: "10px", marginBottom: "30px" }}
        />

        <nav style={styles.nav}>
          <a style={styles.navItem} href="/home">Home</a>
          <a style={styles.navItem} href="/about">About</a>
          <a style={styles.navItem} href="/settings">Settings</a>
        </nav>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        <h1 style={styles.pageTitle}>Settings</h1>

        {/* PROFILE SETTINGS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>👤 Profile</h2>
          <div style={styles.card}>
            <p>Email: (Auto-filled from database later)</p>
            <p>User ID: (Auto-filled)</p>
          </div>
        </section>

        {/* LANGUAGE SETTINGS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🌐 Language</h2>
          <div style={styles.card}>
            <select style={styles.selectBox}>
              <option>English</option>
              <option>हिंदी</option>
              <option>मराठी</option>
              <option>বাংলা</option>
              <option>தமிழ்</option>
            </select>
          </div>
        </section>

        {/* APP CONFIG */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>⚙ App Preferences</h2>
          <div style={styles.card}>
            <p>Notifications: Enabled</p>
            <p>Auto AI Detection: Enabled</p>
          </div>
        </section>

        {/* LOGOUT BUTTON */}
        <section style={styles.section}>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </section>

      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f4fff8",
    fontFamily: "Inter, Noto Sans, Poppins, sans-serif",
  },

  sidebar: {
    width: "250px",
    backgroundColor: "#0f5132",
    color: "white",
    padding: "30px 20px",
    borderRight: "4px solid #0a3f25",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  navItem: {
    color: "white",
    fontSize: "18px",
    textDecoration: "none",
    padding: "8px 0",
    transition: "0.2s",
  },

  main: {
    flexGrow: 1,
    padding: "40px 50px",
    overflowY: "auto",
  },

  pageTitle: {
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "30px",
  },

  section: {
    marginBottom: "40px",
  },

  sectionTitle: {
    fontSize: "22px",
    fontWeight: 600,
    marginBottom: "10px",
  },

  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  selectBox: {
    width: "200px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  logoutBtn: {
    padding: "15px 30px",
    backgroundColor: "#cc0000",
    color: "white",
    fontSize: "18px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.2s",
  },
};

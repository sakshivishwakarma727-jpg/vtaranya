"use client";

import Image from "next/image";

export default function AboutPage() {
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
        <h1 style={styles.pageTitle}>About VTARANYA</h1>

        <div style={styles.heroBox}>
          <Image 
            src="/nature-hero.jpg"
            alt="Nature"
            width={1100}
            height={300}
            style={styles.heroImage}
          />
        </div>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🌿 Our Mission</h2>
          <p style={styles.text}>
            VTARANYA is a Nature Reporting System created to help citizens 
            report environmental issues in real-time and assist authorities 
            with faster, AI-powered decision-making.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🌱 What We Do</h2>
          <ul style={styles.list}>
            <li>Detect pollution using AI image scanning</li>
            <li>Auto-categorize user complaints</li>
            <li>Send reports to the correct government authority</li>
            <li>Track actions taken on reported issues</li>
            <li>Provide transparency between public and system</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🌏 Our Goal</h2>
          <p style={styles.text}>
            To build a cleaner, greener, and more sustainable world by 
            connecting public awareness with advanced AI tools and fast 
            authority response systems.
          </p>
        </section>

        <footer style={styles.footer}>
          <p>© 2025 VTARANYA • Nature Reporting System</p>
        </footer>

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
  },

  main: {
    flexGrow: 1,
    padding: "40px 50px",
    overflowY: "auto",
  },

  pageTitle: {
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "20px",
  },

  heroBox: {
    marginBottom: "30px",
  },

  heroImage: {
    width: "100%",
    borderRadius: "12px",
  },

  section: {
    marginBottom: "35px",
  },

  sectionTitle: {
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "10px",
  },

  text: {
    fontSize: "18px",
    lineHeight: "28px",
  },

  list: {
    fontSize: "18px",
    lineHeight: "32px",
  },

  footer: {
    marginTop: "50px",
    textAlign: "center",
    color: "#777",
  },
};

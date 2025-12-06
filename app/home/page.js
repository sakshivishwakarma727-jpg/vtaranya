"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  // Redirect to report after login-from-landing
  useEffect(() => {
    if (redirectTo === "report") {
      setTimeout(() => {
        router.push("/report");
      }, 1200);
    }
  }, []);

  // Check token
  useEffect(() => {
    const token = document.cookie.includes("token=");
    if (!token) router.push("/home");
  }, []);

  const goToReport = () => {
    router.push("/report");
  };

  return (
    <div style={styles.wrapper}>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <img 
          src="/logo.png" 
          alt="VTARANYA Logo"
          style={styles.logoImg}
        />

        <h2 style={styles.logoText}>VTARANYA</h2>

        <nav style={styles.nav}>
          <a style={styles.navItem} className="nav-animate" href="#features">Features</a>
          <a style={styles.navItem} className="nav-animate" href="#about">About</a>
          <a style={styles.navItem} className="nav-animate" href="#settings">Settings</a>
          <a style={styles.navItem} className="nav-animate" href="#profile">Profile</a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        
        {/* HEADER */}
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>Nature Reporting System</h1>

          {/* TOP RIGHT REPORT BUTTON */}
          <button style={styles.topRightReportBtn} onClick={goToReport}>
            Report
          </button>
        </header>

        {/* HERO / INTRO */}
        <section style={styles.heroSection} >
          <img 
            src="/nature.jpg" 
            alt="Nature Banner"
            style={styles.heroImg}
          />
          <div>
          
            <h2 style={styles.heroTitle}>Protecting Nature Together</h2>
            <p style={styles.heroSub}>
              VTARANYA empowers citizens to report environmental issues directly  
              to the right authorities using AI-powered categorization.
            </p>
          </div>


        </section>

        {/* FEATURES */}
        <section id="features" style={styles.section}>
          <h2 style={styles.sectionTitle}>Platform Features</h2>

          <div style={styles.cardContainer}>
            <div style={styles.card}>
              <h3>📍 Location-Based Reports</h3>
              <p>Submit area-based complaints using GPS auto-detection.</p>
            </div>

            <div style={styles.card}>
              <h3>🧠 AI Auto Categorization</h3>
              <p>AI reads your report, removes sensitive data & assigns authorities.</p>
            </div>

            <div style={styles.card}>
              <h3>📊 Status Tracking</h3>
              <p>Track progress and updates of submitted issues.</p>
            </div>

            <div style={styles.card}>
              <h3>🌎 Multilingual Support</h3>
              <p>Available in Hindi, Marathi, English, and regional languages.</p>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" style={styles.section}>
          <h2 style={styles.sectionTitle}>About VTARANYA</h2>
          <p style={styles.aboutText}>
            VTARANYA is an environmental grievance reporting system designed to simplify 
            eco-issue reporting for citizens. It uses AI to identify issue severity, 
            categorize the type (pollution, deforestation, waste dumping), and forward it 
            directly to the responsible authority such as MPCB, BMC, NMC, KMC & district officers.
          </p>
        </section>

        {/* SETTINGS */}
        <section id="settings" style={styles.section}>
          <h2 style={styles.sectionTitle}>Settings</h2>
          <p>Manage profile, language, theme and notifications.</p>
        </section>

        {/* PROFILE */}
        <section id="profile" style={styles.section}>
          <h2 style={styles.sectionTitle}>Profile</h2>
          <p>View your submitted complaints and personal account details.</p>
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <p>© 2025 VTARANYA | Nature Reporting System</p>
        </footer>
      </main>

      {/* CSS ANIMATION */}
      <style>{`
        .nav-animate {
          position: relative;
        }
        .nav-animate:after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0%;
          height: 3px;
          background: white;
          transition: 0.3s;
        }
        .nav-animate:hover:after {
          width: 100%;
        }
      `}</style>

    </div>
  );
}
const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#e9f5ee",
  },

  sidebar: {
    width: "260px",
    backgroundColor: "#0f5132",
    color: "white",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  logoImg: {
    width: "110px",
    height: "110px",
    objectFit: "contain",
    marginBottom: "10px",
  },

  logoText: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "25px",
    letterSpacing: "1px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    width: "100%",
  },

  navItem: {
    color: "white",
    fontSize: "18px",
    textDecoration: "none",
    padding: "6px 4px",
    cursor: "pointer",
    transition: "0.2s",
  },

  main: {
    flexGrow: 1,
    padding: "30px 50px",
    overflowY: "auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  headerTitle: {
    fontSize: "36px",
    fontWeight: "900",
    color: "#0f5132",
  },

  topRightReportBtn: {
    backgroundColor: "#198754",
    color: "white",
    padding: "10px 18px",
    borderRadius: "8px",
    fontSize: "18px",
    border: "none",
    cursor: "pointer",
  },

  heroSection: {
    marginBottom: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  heroTitle: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#0f5132",
  },

  heroSub: {
    maxWidth: "70%",
    fontSize: "18px",
    marginTop: "10px",
  },

  heroImg: {
    width: "260px",
    borderRadius: "12px",
  },

  section: {
    marginBottom: "60px",
  },

  sectionTitle: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  cardContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  card: {
    padding: "20px",
    width: "260px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  aboutText: {
    maxWidth: "80%",
    fontSize: "18px",
    lineHeight: "1.6",
  },

  footer: {
    textAlign: "center",
    padding: "20px 0",
    borderTop: "1px solid #ccc",
    fontSize: "14px",
    marginTop: "50px",
  },
};

"use client";
import Navbar from "@/components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";


export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect");

  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false); // untouched

  // ----------------------------
  // Redirect Logic (unchanged)
  // ----------------------------
  useEffect(() => {
    if (redirectTo === "report") {
      setTimeout(() => router.push("/report"), 1200);
    }
  }, []);

  // ----------------------------
  // Scroll Highlight Logic
  // ----------------------------
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach(sec => observer.observe(sec));
  }, []);

  const scrollTo = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const goToSettings = () => router.push("/settings");
  const goToAbout = () => router.push("/about");
  const goToReport = () => router.push("/report");

  return (
    <div style={styles.wrapper}>
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />

      <main style={styles.main}>

        {/* 🌿 HERO SECTION */}
        <section id="home" style={styles.heroSection}>
          <div style={styles.heroLeft}>
            <h1 style={styles.heroTitle}>VTARANYA — Nature Reporting System</h1>
            <p style={styles.heroSubtitle}>
              AI-powered environmental grievance reporting system for MPCB, BMC, 
              NMC, KMC and District Authorities.
            </p>

            <button style={styles.reportButton} onClick={goToReport}>
              Report an Issue →
            </button>
          </div>

          <img src="/nature.jpg" style={styles.heroImg} />
        </section>

        {/* ✨ FEATURES */}
        <section id="features" style={styles.section}>
          <h2 style={styles.sectionTitle}>Platform Highlights</h2>
          <p style={styles.sectionSubtitle}>Smart tools that make reporting effortless</p>

          <div style={styles.cardRow}>
            {features.map((f, i) => (
              <div key={i} style={styles.card} className="fade-card">
                <div style={styles.cardIcon}>{f.icon}</div>
                <h3 style={styles.cardTitle}>{f.title}</h3>
                <p style={styles.cardText}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 📘 ABOUT */}
        <section id="about" style={styles.section}>
          <h2 style={styles.sectionTitle}>About VTARANYA</h2>
          <p style={styles.aboutText}>
            VTARANYA modernizes the environmental grievance reporting system
            using **AI categorization**, automatic routing to the right authority,  
            privacy-safe data handling, and real-time tracking.
          </p>
        </section>

        {/* 👤 PROFILE */}
        <section id="profile" style={styles.section}>
          <h2 style={styles.sectionTitle}>Your Profile</h2>
          <p style={styles.aboutText}>
            Review your submitted complaints, track progress and update account settings.
          </p>
        </section>

        <footer style={styles.footer}>
          © 2025 VTARANYA — Environmental Issue Reporting System
        </footer>
      </main>
    </div>
  );
}

// =========================================
// ⭐ FEATURES DATA (Not Logic — Just Display)
// =========================================
const features = [
  {
    icon: "📍",
    title: "Accurate Location Capture",
    desc: "Auto-detect GPS location for precise report mapping.",
  },
  {
    icon: "🧠",
    title: "AI Smart Categorization",
    desc: "AI removes personal data and assigns reports to the right authority.",
  },
  {
    icon: "📊",
    title: "Track Progress",
    desc: "Monitor your complaint status in real-time.",
  },
  {
    icon: "🌎",
    title: "Multilingual",
    desc: "Supports English, Hindi and Marathi.",
  },
];

// =========================================
// ⭐ ENHANCED PROFESSIONAL STYLES
// =========================================

const styles = {
  wrapper: {
    background: "#ecf4ef",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
  },

  main: { padding: "40px 30px" },

  // ----------------------------------
  // HERO
  // ----------------------------------
  heroSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(14px)",
    padding: "40px",
    borderRadius: "18px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    marginBottom: "60px",
  },

  heroLeft: { maxWidth: "55%" },

  heroTitle: {
    fontSize: "40px",
    fontWeight: 900,
    color: "#0f5132",
  },

  heroSubtitle: {
    fontSize: "20px",
    marginTop: "10px",
    color: "#145a41",
    lineHeight: 1.6,
  },

  heroImg: {
    width: "320px",
    borderRadius: "16px",
    boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
  },

  reportButton: {
    marginTop: "25px",
    background: "linear-gradient(135deg, #0f8f53, #0c6d40)",
    color: "white",
    padding: "12px 22px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "700",
    boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
    transition: "0.2s",
  },

  // ----------------------------------
  // FEATURES
  // ----------------------------------

  section: { marginBottom: "80px" },

  sectionTitle: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#0f5132",
    textAlign: "center",
  },

  sectionSubtitle: {
    textAlign: "center",
    marginTop: "8px",
    color: "#18724a",
    fontSize: "18px",
  },

  cardRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "25px",
    marginTop: "40px",
    justifyContent: "center",
  },

  card: {
    width: "260px",
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
  },

  cardIcon: { fontSize: "34px", marginBottom: "12px" },

  cardTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#0f5132",
    marginBottom: "10px",
  },

  cardText: { fontSize: "16px", color: "#145a41" },

  // ----------------------------------
  // ABOUT
  // ----------------------------------

  aboutText: {
    marginTop: "20px",
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#124f36",
    maxWidth: "850px",
  },

  footer: {
    textAlign: "center",
    padding: "20px",
    marginTop: "60px",
    fontWeight: 600,
  },
};

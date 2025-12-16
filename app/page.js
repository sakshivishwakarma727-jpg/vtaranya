"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function LandingPage() {

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // REPORT CLICK HANDLER - ALWAYS FORCES LOGIN FIRST
  const handleReportClick = (e) => {
    e.preventDefault();

    // ALWAYS open login page specifically for secure report flow
    router.push("/login?redirect=homeThenReport");
  };

  // FADE-UP SCROLL ANIMATION
  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    
    <div style={styles.wrapper}>

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logoSection}>
          <img src="/logo.png" alt="Logo" style={styles.logoImg} />
          <h2 style={styles.logo}>VTARANYA</h2>
        </div>
        

        <div style={styles.btnBox}>
          {/* NORMAL LOGIN BUTTON – DOES NOT AFFECT REPORT FLOW */}
          <a href="/login" style={styles.authBtn}>Login</a>

          <a href="/register" style={{ ...styles.authBtn, ...styles.registerBtn }}>SIGN UP</a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
         <h1 style={{...styles.welcome, animation: "fadeInUp 1s"}} className="fade-up">Welcome in Nature reporting system </h1>

        {/* ENGLISH */}

        <p style={styles.description} className="fade-up">
          VTARANYA is a citizen-support platform designed to help report environmental issues 
          responsibly and efficiently. Our AI system classifies reports and routes them to the 
          correct authority while protecting user identity.
        </p>

        {/* HINDI */}
        <p style={styles.description} className="fade-up">
          VTARANYA एक नागरिक सहायता मंच है जो पर्यावरण से जुड़ी समस्याओं की ज़िम्मेदारी से और 
          प्रभावी ढंग से रिपोर्ट करने में मदद करता है। हमारी एआई प्रणाली आपकी शिकायतों को 
          सही विभाग तक तुरंत कार्रवाई के लिए पहुँचाती है।
        </p>

        {/* MARATHI */}
        <p style={styles.description} className="fade-up">
          VTARANYA हे नागरिकांना पर्यावरणाशी संबंधित तक्रारी जबाबदारीने आणि प्रभावी पद्धतीने 
          नोंदवण्यासाठी मदत करणारे व्यासपीठ आहे. आमची एआय प्रणाली तुमची तक्रार योग्य 
          सरकारी विभागाकडे त्वरित कारवाईसाठी पोहोचवते.
        </p>


        {/*infoBox*/}
        <div style={styles.infoBox} className="fade-up">
          <h3 style={styles.infoHeading}>What You Can Report / आप क्या रिपोर्ट कर सकते हैं / आपण काय रिपोर्ट करू शकता</h3>

          <ul style={styles.infoList}>
            <li>Pollution (Air, Water, Noise) / प्रदूषण / प्रदूषण</li>
            <li>Illegal Waste Dumping / अवैध कचरा फेंकना / अनधिकृत कचरा टाकणे</li>
            <li>Deforestation & Tree Cutting / जंगलों की कटाई / वृक्षतोड</li>
            <li>Wildlife Injuries or Threats / वन्यजीव समस्याएँ / वन्यजीव धोका</li>
            <li>Water Contamination / पानी प्रदूषण / पाणी प्रदूषण</li>
            <li>Hazardous Chemicals / हानिकारक रसायन / धोकादायक रसायने</li>
          </ul>

          {/* REPORT BUTTON (EDITED) */}
          <div style={{ textAlign: "center", marginTop: "35px" }}>
            <button
              onClick={handleReportClick}
              style={styles.reportBtn}
              className="fade-up"
            >
              🚨 Report Environmental Issue
            </button>
          </div>
        </div>

      </main>

      <footer style={styles.footer}>
        <p>© 2025 VTARANYA — Protecting Nature Together</p>
      </footer>

      <style>{`
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease-out;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
}
// STYLES (unchanged)
const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#465653ff",
    fontFamily: "'Trebuchet MS', Arial, sans-serif",
    color: "#e0f7e5",
    scrollBehavior: "smooth",
  },

  reportBtn: {
    padding: "14px 26px",
    backgroundColor: "#2e4d3cff",
    color: "white",
    fontSize: "17px",
    border: "2px solid #e6e6e6",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "#5d8474ff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
    borderBottom: "2px solid #e9e3d2ff",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logoSection: { display: "flex", alignItems: "center", gap: "14px" },

  logoImg: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #bfa14b",
    boxShadow: "0 6px 15px rgba(0,0,0,0.7)",
    transition: "transform 0.3s ease",
  },

  logo: {
    fontSize: "30px",
    fontWeight: "700",
    letterSpacing: "1px",
    color: "#f5f5f5",
    textShadow: "0 4px 12px rgba(0,0,0,0.7)",
  },

  btnBox: { display: "flex", gap: "20px" },

  authBtn: {
    padding: "10px 22px",
    backgroundColor: "transparent",
    border: "2px solid #f5f5f5",
    color: "#e3d9d9ff",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(6, 9, 8, 0.6)",
  },

  registerBtn: { color: "#cad3ceff" },

  main: {
    flexGrow: 1,
    padding: "60px 25px",
    textAlign: "center",
    maxWidth: "950px",
    margin: "0 auto",
  },

  welcome: {
    fontSize: "35px",
    fontWeight: "700",
    marginBottom: "30px",
    color: "#f5f5f5",
    textShadow: "0 3px 16px rgba(0,0,0,0.8)",
  },

  description: {
    fontSize: "15px",
    lineHeight: "1.8",
    marginBottom: "25px",
    color: "#d9f0e0",
  },

  infoBox: {
    backgroundColor: "#6a9484ff",
    padding: "35px",
    borderRadius: "18px",
    marginTop: "40px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.7)",
    textAlign: "left",
  },

  infoHeading: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#f5f5f5",
    marginBottom: "20px",
    textAlign: "center",
  },

  infoList: {
    listStyle: "disc",
    marginLeft: "20px",
    color: "#e0f7e5",
    lineHeight: "1.7",
  },

  footer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#5e8073ff",
    color: "#f5f5f5",
    marginTop: "40px",
    boxShadow: "0 -4px 18px rgba(0,0,0,0.6)",
    borderTop: "2px solid #e3e3e1ff",
  },
};


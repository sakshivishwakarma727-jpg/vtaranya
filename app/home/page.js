"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ SINGLE EFFECT — SAFE
  useEffect(() => {
    let active = true;

    async function init() {
      try {

        // USER
        const userRes = await fetch("/api/user/me", {
          credentials: "include",
        });


        if (userRes.ok) {
          const userData = await userRes.json();
          if (active) setUser(userData);
        }

        // PREFERENCES
        const prefRes = await fetch("/api/preferences/get", {
          credentials: "include",
        });

        if (prefRes.ok) {
          const prefs = await prefRes.json();
          if (active) setTheme(prefs.theme || "light");
        }
      } catch (err) {
        console.error("Home init failed:", err);
        router.replace("/");
      } finally {
        if (active) setLoading(false);
      }
    }

    init();

    return () => {
      active = false;
    };
  }, [router]);

  // ✅ SAFE LOADING RETURN (after hooks)
  if (loading) return null;


  return (
    <div className={`page ${theme}`}>
      <Navbar user={user} />

      {/* THEME TOGGLE */}
      <div className="theme-bar">
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      {/* HERO */}
      <section className="hero fade-in">
        <h1>
          Welcome, <span>{user?.name}</span>
        </h1>
        <p className="hero-sub">
          VTARANYA is India’s secure, AI-assisted environmental grievance
          reporting platform designed for citizens and government authorities.
        </p>

        <div className="hero-actions">
          <button onClick={() => router.push("/report")}>
            Submit Environmental Report
          </button>
          <button className="outline">
            Learn How It Works
          </button>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div>✔ AI-verified complaints</div>
        <div>✔ Authority-ready reports</div>
        <div>✔ Identity-protected citizens</div>
        <div>✔ Full accountability</div>
      </section>

      {/* PLATFORM OVERVIEW */}
      <section className="section">
        <h2>Why VTARANYA Exists</h2>
        <p>
          Environmental complaints often fail due to poor classification,
          missing evidence, identity exposure, or lack of authority routing.
          VTARANYA solves this by introducing intelligence, structure, and
          transparency into environmental governance.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="section alt">
        <h2>How the System Works</h2>

        <div className="steps">
          {[
            "Citizen submits complaint with evidence",
            "AI removes personal identifiers",
            "Issue is classified & geo-mapped",
            "Routed to the correct authority",
            "Tracked until resolution",
          ].map((text, i) => (
            <div key={i} className="step-card">
              <span>{i + 1}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOR AUTHORITIES */}
      <section className="section">
        <h2>Designed for Government Authorities</h2>
        <ul className="gov-list">
          <li>Standardized complaint format</li>
          <li>Evidence-linked reports</li>
          <li>Jurisdiction-based auto routing</li>
          <li>Priority scoring using AI</li>
          <li>Audit-ready digital trail</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Environmental Protection Needs Action</h2>
        <p>
          VTARANYA bridges citizens and authorities with trust, transparency,
          and technology.
        </p>
        <button onClick={() => router.push("/report")}>
          Start a Verified Report
        </button>
      </section>

      <footer>
        © 2025 VTARANYA — National Environmental Governance Platform
      </footer>

      {/* ---------------- STYLES ---------------- */}
      <style jsx>{`
        .page {
          font-family: Inter, sans-serif;
          transition: background 0.4s, color 0.4s;
        }

        /* THEMES */
        .light {
          background: #f4f7f5;
          color: #102d23;
        }

        .dark {
          background: #0f1f1a;
          color: #e5f3ed;
        }

        .theme-bar {
          display: flex;
          justify-content: flex-end;
          padding: 20px 40px;
        }

        .theme-bar button {
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 600;
        }

        /* HERO */
        .hero {
          padding: 120px 40px;
          text-align: center;
        }

        .hero h1 {
          font-size: 44px;
          font-weight: 800;
        }

        .hero h1 span {
          color: #1c7c54;
        }

        .hero-sub {
          max-width: 900px;
          margin: 20px auto;
          font-size: 18px;
          line-height: 1.7;
          opacity: 0.9;
        }

        .hero-actions {
          margin-top: 35px;
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .hero-actions button {
          padding: 14px 30px;
          border-radius: 10px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          background: #1c7c54;
          color: white;
        }

        .hero-actions .outline {
          background: transparent;
          border: 2px solid #1c7c54;
          color: #1c7c54;
        }

        /* TRUST STRIP */
        .trust-strip {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          background: #1c7c54;
          color: white;
          padding: 25px;
          text-align: center;
          font-weight: 600;
        }

        /* SECTIONS */
        .section {
          padding: 90px 60px;
        }

        .section.alt {
          background: rgba(0, 0, 0, 0.04);
        }

        .section h2 {
          font-size: 32px;
          margin-bottom: 20px;
        }

        .section p {
          max-width: 900px;
          line-height: 1.8;
          font-size: 17px;
        }

        /* STEPS */
        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .step-card {
          padding: 25px;
          border-radius: 14px;
          background: white;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .dark .step-card {
          background: #1a2f29;
        }

        .step-card span {
          font-size: 24px;
          font-weight: 800;
          color: #1c7c54;
        }

        /* GOV LIST */
        .gov-list {
          margin-top: 20px;
          line-height: 2;
          font-size: 18px;
        }

        /* CTA */
        .cta {
          background: #102d23;
          color: white;
          padding: 90px 40px;
          text-align: center;
        }

        .cta button {
          margin-top: 25px;
          padding: 16px 36px;
          font-size: 18px;
          border-radius: 10px;
          border: none;
          background: #2da36a;
          font-weight: 700;
          cursor: pointer;
        }

        footer {
          padding: 20px;
          text-align: center;
          background: #081813;
          color: #9fcfc0;
        }

        /* FADE */
        .fade-in {
          animation: fadeIn 1.1s ease forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

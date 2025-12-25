"use client";

import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function init() {
      try {
        const userRes = await fetch("/api/user/me", { credentials: "include" });
        if (!userRes.ok) return router.replace("/");

        const userData = await userRes.json();
        if (active) setUser(userData);

        const prefRes = await fetch("/api/preferences", {
          credentials: "include",
        });

        if (prefRes.ok) {
          const prefs = await prefRes.json();
          if (active) setTheme(prefs.theme || "light");
        }
      } catch {
        router.replace("/");
      } finally {
        if (active) setLoading(false);
      }
    }

    init();
    return () => (active = false);
  }, [router]);

  async function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    await fetch("/api/preferences", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ theme: nextTheme }),
    });
  }

  if (loading) return null;

  return (
    <div className={`page ${theme}`}>
      <Navbar user={user} />

      {/* TOP BAR */}
      <div className="top-bar">
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      {/* HERO */}
      <section className="hero container">
        <h1>
          Welcome, <span>{user?.name}</span>
        </h1>
        <p>
          VTARANYA is India’s secure, AI-assisted environmental grievance
          reporting platform built for citizens and government authorities.
        </p>

        <div className="actions">
          <button className="primary" onClick={() => router.push("/report")}>
            Submit Environmental Report
          </button>
          <button className="secondary">Learn How It Works</button>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust">
        <div className="container trust-grid">
          <span>AI-verified complaints</span>
          <span>Authority-ready reports</span>
          <span>Identity-protected citizens</span>
          <span>Full accountability</span>
        </div>
      </section>

      {/* WHY */}
      <section className="section container">
        <h2>Why VTARANYA Exists</h2>
        <p>
          Environmental complaints fail due to missing evidence, incorrect
          routing, or identity exposure. VTARANYA introduces intelligence,
          structure, and accountability into environmental governance.
        </p>
      </section>

      {/* HOW */}
      <section className="section soft">
        <div className="container">
          <h2>How the System Works</h2>
          <div className="steps">
            {[
              "Citizen submits complaint with evidence",
              "AI removes personal identifiers",
              "Issue is classified & geo-mapped",
              "Routed to the correct authority",
              "Tracked until resolution",
            ].map((text, i) => (
              <div key={i} className="step">
                <strong>{i + 1}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORITIES */}
      <section className="section container">
        <h2>Designed for Government Authorities</h2>
        <ul>
          <li>Standardized complaint formats</li>
          <li>Evidence-linked reports</li>
          <li>Jurisdiction-based routing</li>
          <li>AI-powered priority scoring</li>
          <li>Audit-ready digital trail</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Environmental Protection Needs Action</h2>
          <p>
            VTARANYA bridges citizens and authorities through trust,
            transparency, and technology.
          </p>
          <button
            className="primary large"
            onClick={() => router.push("/report")}
          >
            Start a Verified Report
          </button>
        </div>
      </section>

      <footer>© 2025 VTARANYA — A Nature Reporting System</footer>

      {/* STYLES */}
      <style jsx>{`
        .page {
          padding-top: 72px;
          font-family: Inter, system-ui, sans-serif;
        }

        .light {
          background: #f4f7f5;
          color: #102d23;
        }

        .dark {
          background: #0f1f1a;
          color: #e5f3ed;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .top-bar {
          display: flex;
          justify-content: flex-end;
          padding: 20px 40px;
        }

        .icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.15);
          background: transparent;
          cursor: pointer;
        }

        .hero {
          padding: 96px 0 72px;
          text-align: center;
        }

        .hero h1 {
          font-size: 42px;
          font-weight: 800;
        }

        .hero span {
          color: #1c7c54;
        }

        .hero p {
          max-width: 760px;
          margin: 24px auto;
          font-size: 18px;
          line-height: 1.7;
        }

        .actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 32px;
          flex-wrap: wrap;
        }

        button.primary {
          background: #1c7c54;
          color: white;
          padding: 14px 28px;
          border-radius: 8px;
          border: none;
          font-weight: 700;
        }

        button.secondary {
          background: transparent;
          border: 2px solid #1c7c54;
          color: #1c7c54;
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 700;
        }

        .trust {
          background: #1c7c54;
          color: white;
          padding: 24px 0;
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          text-align: center;
          font-weight: 600;
        }

        .section {
          padding: 72px 0;
        }

        .soft {
          background: rgba(0, 0, 0, 0.04);
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }

        .step {
          background: white;
          padding: 24px;
          border-radius: 10px;
        }

        .dark .step {
          background: #1a2f29;
        }

        .cta {
          background: #102d23;
          color: white;
          padding: 72px 0;
          text-align: center;
        }

        footer {
          background: #081813;
          color: #9fcfc0;
          padding: 16px;
          text-align: center;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

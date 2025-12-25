"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          {/* LOGO */}
          <div className="logo-area" onClick={scrollToTop}>
            <img src="/logo.png" alt="VTaranya" className="logo" />
            <span className="title">VTARANYA</span>
          </div>

          {/* MENU */}
          <ul className={`menu ${menuOpen ? "open" : ""}`}>
            <li>
              <button className="nav-link active" onClick={scrollToTop}>
                Home
              </button>
            </li>

            <li>
              <Link href="/settings" onClick={() => setMenuOpen(false)}>
                <button className="nav-link">
                  Settings
                </button>
              </Link>
            </li>
          </ul>

          {/* HAMBURGER */}
          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>

      <style jsx>{`
        /* NAVBAR — ALWAYS VISIBLE */
        .nav {
          width: 100%;
          position: fixed;
          top: 0;
          z-index: 1000;
          background: rgba(15, 77, 51, 0.96);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* MATCH HOME PAGE WIDTH */
        .nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 12px clamp(16px, 4vw, 40px);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .logo {
          width: 40px;
          height: 40px;
          border-radius: 6px;
        }

        .title {
          color: #d9fff0;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.8px;
        }

        .menu {
          display: flex;
          gap: 26px;
          list-style: none;
          align-items: center;
        }

        /* CLASSIC TEXT BUTTONS */
        .nav-link {
          background: none;
          border: none;
          color: #e6fff4;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          padding: 2px 0;
        }

        .nav-link:hover {
          color: #9fffdc;
        }

        /* ACTIVE INDICATOR */
        .active {
          color: #9fffdc;
          border-bottom: 2px solid #9fffdc;
        }

        .hamburger {
          width: 26px;
          height: 20px;
          display: none;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
        }

        .hamburger span {
          width: 100%;
          height: 3px;
          background: #d9fff0;
          border-radius: 2px;
        }

        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .menu {
            position: absolute;
            top: 64px;
            right: 16px;
            background: rgba(15, 77, 51, 0.98);
            width: min(240px, 90vw);
            flex-direction: column;
            padding: 16px;
            display: none;
          }

          .menu.open {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}

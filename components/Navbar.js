"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar({ activeSection, scrollTo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        {/* LOGO */}
        <div className="logo-area">
          <img src="/logo.png" alt="VTaranya" className="logo" />
          <span className="title">VTARANYA</span>
        </div>

        {/* MENU */}
        <ul className={`menu ${menuOpen ? "open" : ""}`}>
          <li>
            <span
              className={activeSection === "home" ? "active" : ""}
              onClick={() => scrollTo("home")}
            >
              Home
            </span>
          </li>

          {/* DROPDOWN */}
          <li className="dropdown">
            <span
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={dropdownOpen ? "active" : ""}
            >
              Services ▾
            </span>

            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              <li>
                <Link href="/report">Report Issue</Link>
              </li>
            </ul>
          </li>

          <li>
            <span onClick={() => scrollTo("about")}>About</span>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
        </ul>

        {/* HAMBURGER */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </div>
      </nav>

      <style jsx>{`
        .nav {
          width: 100%;
          padding: 15px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(15, 77, 51, 0.75);
          backdrop-filter: blur(14px);
          border-radius: 0 0 20px 20px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .title {
          color: #b9ffd9;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 1px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .menu {
          display: flex;
          gap: 28px;
          list-style: none;
          align-items: center;
        }

        .menu li span,
        .menu li a {
          color: #e1ffef;
          text-decoration: none;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          padding: 6px 8px;
          border-radius: 6px;
          transition: all 0.3s;
        }

        .menu li span:hover,
        .menu li a:hover {
          background: rgba(0, 255, 153, 0.15);
          color: #00ff99;
        }

        .active {
          background: rgba(0, 255, 153, 0.2);
          color: #00ff99;
        }

        /* DROPDOWN */
        .dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 38px;
          left: 0;
          background: rgba(15, 77, 51, 0.95);
          backdrop-filter: blur(12px);
          padding: 10px 15px;
          display: none;
          flex-direction: column;
          border-radius: 10px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
          animation: fadeIn 0.3s ease forwards;
        }

        .dropdown-menu.show {
          display: flex;
        }

        .dropdown-menu li {
          margin: 6px 0;
        }

        .dropdown-menu li a {
          color: #b9ffd9;
          font-weight: 600;
        }

        .dropdown-menu li a:hover {
          color: #00ff99;
        }

        /* HAMBURGER */
        .hamburger {
          width: 30px;
          height: 24px;
          display: none;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          z-index: 1100;
        }

        .hamburger span {
          width: 100%;
          height: 4px;
          background: #b9ffd9;
          border-radius: 2px;
          transition: all 0.4s ease;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .menu {
            position: absolute;
            top: 70px;
            right: 20px;
            background: rgba(11, 63, 46, 0.95);
            backdrop-filter: blur(14px);
            width: 220px;
            flex-direction: column;
            padding: 20px;
            border-radius: 12px;
            display: none;
          }

          .menu.open {
            display: flex;
            animation: slideIn 0.3s ease forwards;
          }

          .menu li {
            margin-bottom: 12px;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function SettingsDropdown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <button
        className="px-4 py-2 bg-gray-800 text-white rounded-md"
        onClick={() => setOpen(!open)}
      >
        Settings ⚙️
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-lg z-20">
          <Link href="/settings/profile" className="dropdown-item">👤 Profile</Link>
          <Link href="/settings/notifications" className="dropdown-item">🔔 Notifications</Link>
          <Link href="/settings/language" className="dropdown-item">🌐 Language</Link>
          <Link href="/settings/theme" className="dropdown-item">🎨 Theme</Link>
          <Link href="/settings/about" className="dropdown-item">ℹ️ About Us</Link>
          <Link href="/logout" className="dropdown-item text-red-600">🚪 Logout</Link>
        </div>
      )}

      <style jsx>{`
        .dropdown-item {
          display: block;
          padding: 10px 14px;
          border-bottom: 1px solid #eee;
          color: #333;
        }
        .dropdown-item:hover {
          background: #f8f8f8;
        }
        .dropdown-item:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
}

"use client";

export default function SettingsSidebar({ active, setActive }) {
  const items = [
    { id: "profile", label: "Profile" },
    { id: "notifications", label: "Notifications" },
    { id: "language", label: "Language" },
    { id: "about", label: "About Us" },
    { id: "logout", label: "Logout" },
  ];

  return (
    <aside className="sidebar">
      {items.map((item) => (
        <button
          key={item.id}
          className={active === item.id ? "active" : ""}
          onClick={() => setActive(item.id)}
        >
          {item.label}
        </button>
      ))}

      <style jsx>{`
        .sidebar {
          width: 240px;
          background: #ffffff;
          border-right: 1px solid #dfe6e3;
          padding: 30px 15px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        button {
          background: none;
          border: none;
          text-align: left;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          color: #2c3e50;
        }

        .active {
          background: #1c7c54;
          color: white;
        }

        @media (max-width: 900px) {
          .sidebar {
            flex-direction: row;
            width: 100%;
            overflow-x: auto;
          }
        }
      `}</style>
    </aside>
  );
}

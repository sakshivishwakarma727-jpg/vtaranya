export default function Sidebar({ active, setActive }) {
  const items = [
    { id: "profile", label: "Profile" },
    { id: "about", label: "About" },
    { id: "logout", label: "Logout" },
  ];

  return (
    <aside className="sidebar">
      <div className="header">
        <span className="icon">⚙</span>
        <h2>VTARANYA</h2>
      </div>

      <nav className="menu">
        {items.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${active === item.id ? "active" : ""}`}
            onClick={() => setActive(item.id)}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <style jsx>{`
        .sidebar {
          width: 260px;
          min-height: 100vh;
          background: linear-gradient(180deg, #0f2a21, #102d23);
          color: #e5e7eb;
          padding: 28px 22px;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          font-family: "Inter", "Segoe UI", system-ui, sans-serif;
        }

        /* HEADER */
        .header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 22px;
          margin-bottom: 22px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .icon {
          font-size: 18px;
        }

        h2 {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #f9fafb;
        }

        /* MENU */
        .menu {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 13px 14px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid transparent;
          color: #e5e7eb;
          font-size: 14px;
          text-align: left;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .menu-item span {
          flex: 1;
        }

        /* GRID-LINE EFFECT */
        .menu-item:not(:last-child) {
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* HOVER */
        .menu-item:hover {
          background: rgba(28, 124, 84, 0.15);
          border-color: rgba(28, 124, 84, 0.4);
        }

        /* ACTIVE */
        .menu-item.active {
          background: #1c7c54;
          border-color: #22c55e;
          color: #ffffff;
          box-shadow: inset 3px 0 0 #22c55e;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .sidebar {
            width: 220px;
            padding: 20px 16px;
          }
        }
      `}</style>
    </aside>
  );
}

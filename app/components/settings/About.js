export default function AboutPanel() {
  return (
    <section className="about-panel">
      <h1>About VTARANYA</h1>

      <p className="intro">
        VTARANYA is a private digital platform designed to help individuals
        report environmental and civic-related concerns responsibly.
        The system focuses on simplicity, accuracy, and user trust.
      </p>

      <div className="grid">
        <div className="card">
          <h3>🎯 Purpose</h3>
          <p>
            To provide a structured and transparent way for users to submit
            grievances, track submissions, and contribute to better community
            awareness.
          </p>
        </div>

        <div className="card">
          <h3>🛡 Data & Privacy</h3>
          <p>
            User information is securely stored and used only to improve
            platform functionality. VTARANYA does not share personal data
            with third parties.
          </p>
        </div>

        <div className="card">
          <h3>⚙ Platform Features</h3>
          <ul>
            <li>Profile-based reporting system</li>
            <li>Multi-language interface</li>
            <li>Secure authentication</li>
            <li>Dashboard & settings management</li>
          </ul>
        </div>

        <div className="card">
          <h3>🌱 Vision</h3>
          <p>
            VTARANYA aims to empower users with a reliable platform that
            encourages responsible reporting and positive action.
          </p>
        </div>
      </div>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} VTARANYA · Private Grievance Platform
        </p>
      </footer>

      <style jsx>{`
        .about-panel {
          background: #ffffff;
          padding: 36px;
          border-radius: 12px;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
          font-family: "Inter", "Segoe UI", system-ui, sans-serif;
        }

        h1 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 14px;
          color: #111827;
        }

        .intro {
          font-size: 14.5px;
          line-height: 1.7;
          color: #4b5563;
          max-width: 760px;
          margin-bottom: 30px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 20px;
        }

        .card h3 {
          font-size: 16px;
          margin-bottom: 10px;
          color: #111827;
        }

        .card p,
        .card li {
          font-size: 13.5px;
          color: #4b5563;
          line-height: 1.6;
        }

        ul {
          padding-left: 18px;
          margin: 0;
        }

        .footer {
          margin-top: 36px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          font-size: 12.5px;
          color: #6b7280;
        }

        @media (max-width: 768px) {
          .about-panel {
            padding: 26px;
          }
        }
      `}</style>
    </section>
  );
}

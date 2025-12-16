"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SettingsSidebar from "@/components/settingdropdrown";

export default function SettingsPage() {
  const router = useRouter();
  const [active, setActive] = useState("profile");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDeleteAccount() {
    try {
      setLoading(true);
      const res = await fetch("/api/account/delete", {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        router.replace("/");
      } else {
        alert("Failed to delete account");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="settings-page">
      {/* HEADER */}
      <header className="settings-header">
        <div className="brand">
          <img src="/logo.png" alt="VTARANYA" />
          <div>
            <h1>VTARANYA</h1>
            <span>Account Settings</span>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="settings-body">
        <SettingsSidebar active={active} setActive={setActive} />

        <main className="settings-content">
          {/* PROFILE */}
          {active === "profile" && (
            <section>
              <h2>Profile</h2>
              <p>View and manage your personal account information.</p>

              <div className="card">
                <label>Name</label>
                <input disabled placeholder="Fetched from database" />

                <label>Email</label>
                <input disabled placeholder="Fetched from database" />
              </div>
            </section>
          )}

          {/* NOTIFICATIONS */}
          {active === "notifications" && (
            <section>
              <h2>Notifications</h2>
              <p>Control system alerts and report updates.</p>

              <div className="card">
                <label>
                  <input type="checkbox" defaultChecked /> Email updates
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> Report status alerts
                </label>
              </div>
            </section>
          )}

          {/* LANGUAGE */}
          {active === "language" && (
            <section>
              <h2>Language Preferences</h2>
              <p>Select your preferred language.</p>

              <div className="card">
                <select>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="mr">Marathi</option>
                </select>
              </div>
            </section>
          )}

          {/* ABOUT */}
          {active === "about" && (
            <section>
              <h2>About VTARANYA</h2>
              <p>
                VTARANYA is a verified environmental grievance reporting platform
                designed to securely connect citizens and authorities using AI,
                structured reporting, and accountability.
              </p>
            </section>
          )}

          {/* LOGOUT */}
          {active === "logout" && (
            <section>
              <h2>Delete Account</h2>
              <p className="danger-text">
                Deleting your account will permanently remove your public data.
                
              </p>

              <button
                className="danger-btn"
                onClick={() => setShowConfirm(true)}
              >
                Delete My Account
              </button>
            </section>
          )}
        </main>
      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Confirm Account Deletion</h3>
            <p>
              This action is irreversible. Your reports will be removed from the
              public system. Internal records may be retained for compliance.
            </p>

            <div className="modal-actions">
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
              <button
                className="danger-btn"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        .settings-page {
          min-height: 100vh;
          background: #f4f7f5;
          color: #102d23;
          font-family: Inter, sans-serif;
        }

        .settings-header {
          padding: 20px 40px;
          border-bottom: 1px solid #dfe6e3;
          background: white;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand img {
          width: 42px;
        }

        .brand h1 {
          margin: 0;
          font-size: 20px;
        }

        .brand span {
          font-size: 13px;
          color: #4f6f63;
        }

        .settings-body {
          display: flex;
          min-height: calc(100vh - 80px);
        }

        .settings-content {
          flex: 1;
          padding: 40px;
        }

        h2 {
          margin-bottom: 10px;
        }

        .card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          max-width: 500px;
        }

        label {
          display: block;
          margin-bottom: 15px;
        }

        input,
        select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #cfdad5;
        }

        .danger-btn {
          background: #c0392b;
          color: white;
          padding: 12px 22px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .danger-text {
          color: #b3392f;
          max-width: 500px;
        }

        /* MODAL */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal {
          background: white;
          padding: 30px;
          border-radius: 14px;
          max-width: 420px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 20px;
        }

        @media (max-width: 900px) {
          .settings-body {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

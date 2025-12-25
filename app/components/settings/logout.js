"use client";

import { useState } from "react";

export default function LogoutPanel() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!acknowledged) {
      alert("Please acknowledge the declaration before proceeding.");
      return;
    }

    const finalConfirm = confirm(
      "You are requesting permanent deletion of your VTARANYA account.\n\nThis action is irreversible."
    );

    if (!finalConfirm) return;

    setLoading(true);

    const res = await fetch("/api/account/delete", {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      alert("Account deletion failed. Please contact support.");
      setLoading(false);
    }
  }

  return (
    <section className="gov-card">
      <header className="gov-header">
        <h2>Account Deletion Request</h2>
      </header>

      <p className="gov-text">
        You are requesting permanent deletion of your VTARANYA user account.
      </p>

      <div className="gov-notice">
        <strong>Important Notice</strong>
        <ul>
          <li>All reports and submissions will be permanently erased</li>
          <li>This action cannot be reversed</li>
          <li>You will lose access immediately</li>
        </ul>
      </div>

      <label className="gov-checkbox">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => setAcknowledged(e.target.checked)}
        />
        <span>
          I hereby confirm that I understand the consequences and voluntarily
          request deletion of my account.
        </span>
      </label>

      <div className="gov-actions">
        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={!acknowledged || loading}
        >
          {loading ? "Processing Request..." : "Delete"}
        </button>
      </div>

      <style jsx>{`
        .gov-card {
          max-width: 640px;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 12px;
          padding: 36px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .gov-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        h2 {
          font-size: 22px;
          font-weight: 600;
          color: #1f2937;
        }

        .risk-tag {
          background: #fef3c7;
          color: #92400e;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .gov-text {
          font-size: 15px;
          color: #374151;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .gov-notice {
          background: #f9fafb;
          border-left: 4px solid #f59e0b;
          padding: 14px 18px;
          margin-bottom: 24px;
          border-radius: 6px;
        }

        .gov-notice ul {
          margin: 8px 0 0 18px;
          font-size: 14px;
          color: #4b5563;
        }

        .gov-checkbox {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 14px;
          color: #374151;
          margin-bottom: 28px;
        }

        .gov-checkbox input {
          margin-top: 4px;
          transform: scale(1.1);
        }

        .gov-actions {
          display: flex;
          justify-content: flex-end;
        }

        .delete-btn {
          background: #991b1b;
          color: #ffffff;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .delete-btn:hover:not(:disabled) {
          background: #7f1d1d;
        }

        .delete-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}

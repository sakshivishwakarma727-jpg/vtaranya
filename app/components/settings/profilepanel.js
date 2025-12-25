"use client";
import { useEffect, useState } from "react";

export default function ProfilePanel() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/user/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setName(data.name);
        setOriginalName(data.name);
      });
  }, []);

  function startEdit() {
    setEditing(true);
    setMsg("");
    setError("");
  }

  function cancelEdit() {
    setName(originalName);
    setEditing(false);
    setMsg("");
    setError("");
  }

  async function saveProfile() {
    setLoading(true);
    setMsg("");
    setError("");

    const res = await fetch("/api/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
    } else {
      setUser(data.user);
      setOriginalName(data.user.name);
      setName(data.user.name);
      setEditing(false);
      setMsg("✅ Profile updated. Changes allowed again after 30 days.");
    }

    setLoading(false);
  }

  if (!user) return null;

  const hasChanges = name !== originalName;

  return (
    <div className="profile">
      <div className="top">
        <div className="avatar">{user.name[0]}</div>
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      <div className={`card ${editing ? "editing" : ""}`}>
        <div className="field">
          <label>Username</label>
          <input
            value={name}
            disabled={!editing}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Email</label>
          <input value={user.email} disabled />
        </div>

        <div className="actions">
          {!editing ? (
            <button onClick={startEdit}>Edit Profile</button>
          ) : (
            <>
              <button
                className="save"
                disabled={!hasChanges || loading}
                onClick={saveProfile}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button className="cancel" onClick={cancelEdit}>
                Cancel
              </button>
            </>
          )}
        </div>

        {msg && <p className="success">{msg}</p>}
        {error && <p className="error">{error}</p>}
      </div>

      <style jsx>{`
        .profile {
          max-width: 850px;
        }

        .top {
          display: flex;
          gap: 18px;
          align-items: center;
          margin-bottom: 30px;
        }

        .avatar {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1c7c54, #5a7168ff);
          color: white;
          font-size: 26px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          transition: border 0.3s;
        }

        .card.editing {
          border: 2px solid #428b6fff;
          background: #def2e5ff;
        }

        .field {
          margin-bottom: 18px;
        }

        label {
          font-weight: 600;
          margin-bottom: 6px;
          display: block;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
        }

        input:disabled {
          background: #f3f4f6;
        }

        .actions {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        button {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          cursor: pointer;
        }

        .save {
          background: #16a34a;
          color: white;
        }

        .cancel {
          background: #e5e7eb;
        }

        .success {
          margin-top: 14px;
          color: #15803d;
          font-weight: 600;
        }

        .error {
          margin-top: 14px;
          color: #dc2626;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .top {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

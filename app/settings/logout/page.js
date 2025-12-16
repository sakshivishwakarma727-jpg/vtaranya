"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutSettings() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
  }

  async function deleteAccount() {
    setLoading(true);

    const res = await fetch("/api/account/delete", {
      method: "DELETE",
    });

    if (res.ok) {
      router.replace("/login");
    } else {
      alert("Failed to delete account");
    }

    setLoading(false);
  }

  return (
    <div className="settings-content">
      <h2>Logout & Account</h2>

      <button className="btn logout" onClick={logout}>
        Logout
      </button>

      <button className="btn danger" onClick={() => setShowModal(true)}>
        Delete Account
      </button>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>⚠ Confirm Account Deletion</h3>
            <p>
              This will permanently delete your account and all associated data.
              This action cannot be undone.
            </p>

            <div className="modal-actions">
              <button
                className="btn danger"
                disabled={loading}
                onClick={deleteAccount}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>

              <button
                className="btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

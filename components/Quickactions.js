"use client";

export default function QuickActions() {
  return (
    <div style={wrapper}>
      <button style={btn} onClick={() => (window.location.href = "/report")}>
        Report Issue
      </button>

      <button style={btn} onClick={() => (window.location.href = "/settings")}>
        Settings
      </button>
    </div>
  );
}

const wrapper = {
  display: "flex",
  gap: "12px",
};

const btn = {
  padding: "10px 16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "white",
  cursor: "pointer",
  fontWeight: "600",
};

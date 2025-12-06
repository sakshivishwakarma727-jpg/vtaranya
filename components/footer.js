export default function Footer() {
  return (
    <footer style={{ padding: "18px 24px", borderTop: "1px solid #eee", marginTop: 40 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", color: "#666" }}>
        © {new Date().getFullYear()} VTARANYA — Report environmental issues responsibly.
      </div>
    </footer>
  );
}

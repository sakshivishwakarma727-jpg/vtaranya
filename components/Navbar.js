"use client";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav style={{ borderRight: "1px solid #eee", padding: 20, width: 220 }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ marginBottom: 12, cursor: "pointer" }} onClick={() => router.push("/main")}>Dashboard</li>
        <li style={{ marginBottom: 12, cursor: "pointer" }} onClick={() => router.push("/report")}>Report Issue</li>
        <li style={{ marginBottom: 12, cursor: "pointer" }} onClick={() => router.push("/settings")}>Settings</li>
        <li style={{ marginTop: 20, cursor: "pointer", color: "#c00" }} onClick={() => router.push("/api/logout")}>Logout</li>
      </ul>
    </nav>
  );
}

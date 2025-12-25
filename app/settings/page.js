"use client";

import { useState } from "react";
import Sidebar from "@/app/components/settings/sidebar";
import ProfilePanel from "@/app/components/settings/profilepanel";
import AboutPanel from "@/app/components/settings/About";
import LogoutPanel from "@/app/components/settings/logout";

export default function SettingsPage() {
  const [active, setActive] = useState("profile");

  return (
    <div className="layout">
      <Sidebar active={active} setActive={setActive} />

      <section className="content">
        {active === "profile" && <ProfilePanel />}
        {active === "about" && <AboutPanel />}
        {active === "logout" && <LogoutPanel />}
      </section>

      <style jsx>{`
        .layout {
          display: flex;
          min-height: 100vh;
          width: 100%;
          background: var(--bg-main);
        }

        .content {
          flex: 1;
          padding: 40px;
          background: var(--bg-surface);
          border-left: 1px solid var(--border-soft);
        }
      `}</style>
    </div>
  );
}

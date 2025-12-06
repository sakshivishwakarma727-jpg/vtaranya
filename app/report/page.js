"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UserReportPage() {
  const router = useRouter();

  // ---------------- CHECK LOGIN FIRST ----------------
useEffect(() => {
  async function checkAuth() {
    const res = await fetch("/api/auth/check", { credentials: "include" });
    const data = await res.json();

    const urlParams = new URLSearchParams(window.location.search);
    const fromLanding = urlParams.get("fromLanding");

    // 1️⃣ User clicked from landing page → ALWAYS show login
    if (fromLanding === "true") {
      router.push("/login?redirect=homeThenReport");
      return;
    }

    // 2️⃣ User accessing from home or direct URL
    if (!data.loggedIn) {
      router.push("/login?redirect=report");
    }
  }

  checkAuth();
}, []);




  // ---------------- FORM STATES ----------------
  const [form, setForm] = useState({
    name: "",
    contactOrEmail: "",
    issue: "",
    description: "",
    law: "",
    location: null,
  });

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ---------------- LOCATION FUNCTION ----------------
  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Your device does not support location.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm({
          ...form,
          location: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
        });
      },
      (err) => {
        alert("Location permission denied.");
        console.error(err);
      }
    );
  };

  // ---------------- MEDIA UPLOAD ----------------
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    if (file) setMediaPreview(URL.createObjectURL(file));
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    if (!form.contactOrEmail) {
      setError("Please provide Contact number or Email.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d{10,15}$/;

    if (!emailPattern.test(form.contactOrEmail) && !phonePattern.test(form.contactOrEmail)) {
      setError("Enter a valid Email or Contact number.");
      return false;
    }

    if (!form.issue || !form.description) {
      setError("Please fill all required fields.");
      return false;
    }

    setError("");
    return true;
  };

  // ---------------- SUBMIT FUNCTION ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "location") value = JSON.stringify(value);
      data.append(key, value);
    });

    if (media) data.append("media", media);

    try {
      const res = await fetch("/api/report", { method: "POST", body: data });
      const result = await res.json();

      if (res.ok) {
        setSuccess(`Report submitted successfully! Tracking ID: ${result.report._id}`);
        setForm({ name: "", contactOrEmail: "", issue: "", description: "", law: "", location: null });
        setMedia(null);
        setMediaPreview(null);
      } else {
        setError(result.message || "Submission failed");
      }
    } catch (err) {
      setError("Submission failed. Try again later.");
    }
  };

  // ----------------------------------------------------

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌿 VTARANYA Environmental Report</h1>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <InputField
            label="Full Name"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <InputField
            label="Contact Number or Email"
            placeholder="Enter email or phone number"
            required
            value={form.contactOrEmail}
            onChange={(e) => setForm({ ...form, contactOrEmail: e.target.value })}
          />

          <InputField
            label="Issue Title"
            placeholder="Illegal Tree Cutting, Dumping, etc."
            required
            value={form.issue}
            onChange={(e) => setForm({ ...form, issue: e.target.value })}
          />

          <TextareaField
            label="Issue Description"
            placeholder="Describe the issue in detail..."
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            style={styles.select}
            value={form.law}
            onChange={(e) => setForm({ ...form, law: e.target.value })}
          >
            <option value="">Select Applicable Law (Optional)</option>
            <option value="Environment Protection Act, 1986">Environment Protection Act, 1986</option>
            <option value="Wildlife Protection Act, 1972">Wildlife Protection Act, 1972</option>
            <option value="Water (Prevention & Control of Pollution) Act, 1974">Water Act, 1974</option>
            <option value="Air (Prevention & Control of Pollution) Act, 1981">Air Act, 1981</option>
          </select>

          <button
            type="button"
            onClick={handleLocation}
            style={form.location ? styles.locationSuccess : styles.locationBtn}
          >
            {form.location ? "📍 Location Captured" : "Capture Location"}
          </button>

          <div style={styles.inputWrapper}>
            <label style={styles.label}>Upload Image/Video (Optional)</label>
            <input
              type="file"
              accept="image/*,video/*"
              style={styles.fileInput}
              onChange={handleMediaChange}
            />
            {mediaPreview && (
              <div style={styles.preview}>
                {media?.type?.startsWith("image") ? (
                  <img src={mediaPreview} style={styles.previewMedia} alt="Preview" />
                ) : (
                  <video src={mediaPreview} style={styles.previewMedia} controls />
                )}
              </div>
            )}
          </div>

          <button type="submit" style={styles.submitBtn}>Submit Report</button>
        </form>
      </div>
    </div>
  );
}

/* ---------------- INPUT COMPONENTS ---------------- */
function InputField({ label, ...props }) {
  return (
    <div style={styles.inputWrapper}>
      <label style={styles.label}>{label}</label>
      <input {...props} style={styles.input} />
    </div>
  );
}

function TextareaField({ label, ...props }) {
  return (
    <div style={styles.inputWrapper}>
      <label style={styles.label}>{label}</label>
      <textarea {...props} rows={4} style={styles.textarea} />
    </div>
  );
}

/* ----------------- STYLES ----------------- */
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #cfd3d2ff, #dde8e0ff)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "750px",
    background: "#dddad2d8",
    padding: "45px",
    borderRadius: "20px",
    boxShadow: "0 14px 30px rgba(0,0,0,0.25)",
    border: "1px solid #c1e1c1",
  },

  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#1d4b20ff",
    textShadow: "1px 1px 2px #a5d1cfff",
  },

  error: {
    background: "#ffe5e5",
    color: "#c62828",
    padding: "12px",
    borderRadius: "10px",
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "500",
  },

  success: {
    background: "#e6ffe6",
    color: "#2e7d32",
    padding: "12px",
    borderRadius: "10px",
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "500",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  inputWrapper: { display: "flex", flexDirection: "column" },

  label: {
    marginBottom: "6px",
    fontWeight: "600",
    color: "#1b5e20",
    fontSize: "16px",
  },

  input: {
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "1px solid #c1e1c1",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    outline: "none",
    fontWeight: "500",
  },

  textarea: {
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "1px solid #deeddeff",
    boxShadow: "0 4px 10px rgba(7, 7, 7, 0.1)",
    outline: "none",
    fontWeight: "500",
  },

  select: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #c1e1c1",
    fontSize: "16px",
    fontWeight: "400",
    outline: "none",
  },

  fileInput: {
    padding: "10px",
    border: "1px solid #c1e1c1",
    borderRadius: "12px",
  },

  locationBtn: {
    background: "linear-gradient(90deg, #3e5632ff, #376026ff)",
    border: "1px solid #2e332eff",
    color: "#fffefeff",
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "0.3s",
  },

  locationSuccess: {
    background: "linear-gradient(90deg, #43a047, #66bb6a)",
    color: "#fff",
    padding: "14px",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "center",
  },

  submitBtn: {
    background: "linear-gradient(135deg, #2e7d32, #496a4bff)",
    color: "#fff",
    padding: "16px 0",
    borderRadius: "14px",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
    transition: "0.3s",
  },

  preview: {
    marginTop: "10px",
    maxHeight: "200px",
    overflow: "hidden",
    borderRadius: "12px",
    border: "1px solid #c1e1c1",
  },

  previewMedia: {
    width: "100%",
    height: "auto",
  },
};

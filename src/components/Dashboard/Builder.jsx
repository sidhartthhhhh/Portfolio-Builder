import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from '../../components/Profile';
import { auth, db } from "../../firebase//config"; // ⬅️ updated (to use new firebase config)
import "../../index.css"; // ⬅️ updated (to use new dashboard styles)


const Builder = () => {
  const navigate = useNavigate();

  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  <Routes>
  <Route path="/dashboard/profile" element={<Profile />} />
  </Routes>
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, "portfolios", currentUser.uid);
      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAbout(data.about || "");
          setSkills(data.skills || "");
          setProjects(data.projects || "");
        }
      } catch (error) {
        console.error("❌ Firestore fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const userDocRef = doc(db, "portfolios", currentUser.uid);
    try {
      await setDoc(userDocRef, { about, skills, projects });
      alert("Saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleExport = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>My Portfolio</title>
        <style>
          body { font-family: sans-serif; padding: 20px; background: #f4f4f4; color: #333; }
          h2, h3 { color: #222; }
        </style>
      </head>
      <body>
        <h2>About Me</h2>
        <p>${about}</p>
        <h2>Skills</h2>
        <ul>${skills.split(",").map((s) => `<li>${s.trim()}</li>`).join("")}</ul>
        <h2>Projects</h2>
        <ul>${projects.split("\n").map((p) => `<li>${p.trim()}</li>`).join("")}</ul>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "portfolio.html";
    link.click();
  };

  if (loading) return <p>Loading your portfolio...</p>;

  return (
    <div className="dashboard-wrapper"> {/* ⬅️ updated */}
      <div className="builder-panel"> {/* ⬅️ updated */}
        <h2>🛠 Portfolio Builder</h2>
        <textarea
          rows="4"
          placeholder="About Me"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <textarea
          rows="2"
          placeholder="Skills (comma-separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="Projects (one per line)"
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
        />

        <div className="builder-buttons"> {/* ⬅️ updated */}
          <button onClick={handleSave}>💾 Save</button>
          <button onClick={handleLogout}>🔒 Logout</button>
          <button onClick={handleExport}>📤 Export</button>
          <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Toggle {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>

      <div className="preview-panel"> {/* ⬅️ updated */}
        <h2>👁 Live Preview</h2>
        <h3>About Me</h3>
        <p>{about}</p>
        <h3>Skills</h3>
        <ul>{skills.split(",").map((skill, i) => <li key={i}>{skill.trim()}</li>)}</ul>
        <h3>Projects</h3>
        <ul>{projects.split("\n").map((proj, i) => <li key={i}>{proj.trim()}</li>)}</ul>
      </div>
    </div>
  );
};

export default Builder;

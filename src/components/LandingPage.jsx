// src/components/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const LandingPage = () => {
  const nav = useNavigate();

  return (
    <div className="landing-page">
      <header className="hero">
        <h1>Make Your Portfolio Shine</h1>
        <p>Powerful builder with zero coding. Grow your personal brand—fast.</p>
        <div className="cta-buttons">
          <button className="btn-primary" onClick={() => nav("/register")}>Get Started</button>
          <button className="btn-secondary" onClick={() => nav("/login")}>Log In</button>
        </div>
      </header>

      <section className="features">
        <div className="feature">
          <h2>Drag & Drop</h2>
          <p>Easily build your site with intuitive tools.</p>
        </div>
        <div className="feature">
          <h2>Custom Themes</h2>
          <p>Choose and modify from pro-designed templates.</p>
        </div>
        <div className="feature">
          <h2>Export to GitHub</h2>
          <p>Deploy to GitHub Pages with one click.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

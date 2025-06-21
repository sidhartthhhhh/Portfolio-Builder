// src/components/Auth/Register.jsx
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";

const Register = () => {
  const [name, setName] = useState(""); // New field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name }); // Save full name
      navigate("/dashboard");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      alert("Google Sign-Up Failed");
    }
  };

  return (
    <div className="login-wrapper">
      <h2>📝 Create Your Account</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button onClick={handleRegister}>Register</button>

      <div className="divider">or</div>

      <button className="google-btn" onClick={handleGoogleSignup}>
        🔐 Sign up with Google
      </button>

      <p style={{ fontSize: "0.9rem", marginTop: "10px" }}>
        Already have an account? <a href="/">Log in</a>
      </p>
    </div>
  );
};

export default Register;


import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase/config";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    resumeUrl: "",
    photoUrl: ""
  });
  const [file, setFile] = useState(null);

  const fetchProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    let photoUrl = userData.photoUrl;
    if (file) {
      const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
      await uploadBytes(storageRef, file);
      photoUrl = await getDownloadURL(storageRef);
    }

    const newData = { ...userData, photoUrl };
    await setDoc(doc(db, "users", user.uid), newData);
    alert("Profile updated!");
    setUserData(newData);
  };

  return (
    <div className="profile-wrapper">
      <h2>My Profile</h2>

      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={userData.name}
        onChange={handleChange}
      />

      <textarea
        name="bio"
        placeholder="Write about yourself"
        value={userData.bio}
        onChange={handleChange}
      />

      <input
        type="text"
        name="resumeUrl"
        placeholder="Paste resume link (Google Drive/URL)"
        value={userData.resumeUrl}
        onChange={handleChange}
      />

      <input type="file" onChange={handleFileChange} />
      {userData.photoUrl && (
        <img src={userData.photoUrl} alt="Profile" className="profile-photo" />
      )}

      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
};

export default Profile;

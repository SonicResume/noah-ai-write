import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Pull the compressed string from system environment and parse it safely
const rawConfig = import.meta.env.VITE_FIREBASE_CONFIG;

const firebaseConfig = rawConfig 
  ? JSON.parse(rawConfig)
  : {
      // Local fallback keys for quick debugging if env is missing
      apiKey: "AIzaSyBrck1di7_N7B2d-H8mwZud17N9CYgC8wc",
      authDomain: "resume-97612.firebaseapp.com",
      projectId: "resume-97612",
      storageBucket: "resume-97612.firebasestorage.app",
      messagingSenderId: "1096541776873",
      appId: "1:1096541776873:web:5d4a18ab91bb98f28f7978",
    };

// ✅ PREVENT DUPLICATE APP
const app = getApps().length === 0 
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export const auth = getAuth(app);

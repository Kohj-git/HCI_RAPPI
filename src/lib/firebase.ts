// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCWi0_H-SIpZiPUuirXbawr2_pU8Ihbd0",
  authDomain: "hci-rappi.firebaseapp.com",
  projectId: "hci-rappi",
  storageBucket: "hci-rappi.firebasestorage.app",
  messagingSenderId: "422293981377",
  appId: "1:422293981377:web:046af1e1e360e892e46c40"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, db, googleProvider };

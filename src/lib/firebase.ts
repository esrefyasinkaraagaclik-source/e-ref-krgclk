import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLTC1QtAius3Rc3Btj-VRKU-oFUP0UUHE",
  authDomain: "reactionlab-4006.firebaseapp.com",
  projectId: "reactionlab-4006",
  storageBucket: "reactionlab-4006.firebasestorage.app",
  messagingSenderId: "1010629376290",
  appId: "1:1010629376290:web:6754b70671820f15694d7b",
  measurementId: "G-L8HS4KYBYL"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

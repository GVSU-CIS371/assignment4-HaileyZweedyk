// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX1iPxLR8oHM_06hz5YZpV89mCr2cCPTM",
  authDomain: "cis371-f015e.firebaseapp.com",
  projectId: "cis371-f015e",
  storageBucket: "cis371-f015e.firebasestorage.app",
  messagingSenderId: "652231514148",
  appId: "1:652231514148:web:8dd98ca8bec905791260b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUQ5WiYh7CTiDcR-YzyyjQLfQht6Q29pk",
  authDomain: "classtrack-4fda6.firebaseapp.com",
  projectId: "classtrack-4fda6",
  storageBucket: "classtrack-4fda6.firebasestorage.app",
  messagingSenderId: "895870190134",
  appId: "1:895870190134:web:ac3721a62349b9bfe58e97",
  measurementId: "G-ML8ETDKBLZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

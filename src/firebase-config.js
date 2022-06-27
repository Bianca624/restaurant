import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx1yzhOpO6zhYox76cL9uyEh8yL5zHGcw",
  authDomain: "restaurant-366b2.firebaseapp.com",
  projectId: "restaurant-366b2",
  storageBucket: "restaurant-366b2.appspot.com",
  messagingSenderId: "80109885338",
  appId: "1:80109885338:web:6eadb7f372063f41008c23",
  measurementId: "G-FPMCWEZS9F",
};

// Initialize Firebase Connection
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

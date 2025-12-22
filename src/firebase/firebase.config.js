// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBv1GpC22zPP3FnXQD1dVPsNBTND_hT04",
  authDomain: "bookcourier-2902f.firebaseapp.com",
  projectId: "bookcourier-2902f",
  storageBucket: "bookcourier-2902f.firebasestorage.app",
  messagingSenderId: "231402758746",
  appId: "1:231402758746:web:c6ec0695e318da9c7aee63",
  measurementId: "G-F6N58YDWVL"
};

// Initialize Firebase



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
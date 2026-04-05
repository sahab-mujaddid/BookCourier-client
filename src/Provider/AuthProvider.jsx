import React, { useEffect, useState, createContext } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContex = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Register new user (MongoDB save handled in Register component)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Login existing user (no DB save here)
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Update Firebase profile (optional, used in Register component)
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // 🔹 Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // 🔹 Track auth state and fetch user record from MongoDB
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await fetch(`http://localhost:3000/users/${currentUser.email}`);
          if (res.ok) {
            const dbUser = await res.json();
            setUser({
              ...currentUser,
              role: dbUser.role,
              displayName: dbUser.displayName,
              photoURL: dbUser.photoURL,
            });
          } else {
            // fallback if no record found
            setUser({ ...currentUser, role: "user" });
          }
        } catch (error) {
          console.error("Error fetching user record:", error);
          setUser({ ...currentUser, role: "user" });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    loading,
    setLoading,
    updateUser,
  };

  return (
    <AuthContex.Provider value={authData}>
      {children}
    </AuthContex.Provider>
  );
};

export default AuthProvider;

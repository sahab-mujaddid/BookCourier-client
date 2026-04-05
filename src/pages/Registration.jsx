import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContex } from "../Provider/AuthProvider";
import { GoogleAuthProvider, getAuth, signInWithPopup, updateProfile } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const Register = () => {
  const { createUser, setUser } = useContext(AuthContex);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[0-9]/.test(password)) {
      alert("Password must contain at least one number");
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      alert("Password must contain at least one special character");
      return;
    }

    createUser(email, password, name, photo)
      .then((result) => {
        const user = result.user;

        // ✅ Update Firebase profile first
        updateProfile(user, { displayName: name, photoURL: photo })
          .then(() => {
            // ✅ Save updated user to MongoDB
            const userData = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              role: "user",
            };

            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userData),
            }).catch((err) => console.error("Error saving user:", err));

            // ✅ Update context with correct values
            setUser({ ...user, displayName: name, photoURL: photo });

            navigate(location?.state ? location.state : "/");
          })
          .catch((err) => {
            console.error("Error updating Firebase profile:", err);
            setUser(user); // fallback
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        // ✅ Google users already have displayName & photoURL
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          role: "user",
        };

        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }).catch((err) => console.error("Error saving Google user:", err));

        setUser(user); // update context
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleRegister} className="card-body">
          <div className="text-3xl text-center font-bold">Register Your Account</div>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input name="name" type="text" className="input" placeholder="Name" required />

            <label className="label">Email</label>
            <input name="email" type="email" className="input" placeholder="Email" required />

            <label className="label">Photo Url</label>
            <input name="photo" type="text" className="input" placeholder="Photo Url" required />

            <label className="label">Password</label>
            <input name="password" type="password" className="input" placeholder="Password" required />

            <button type="submit" className="btn bg-blue-400 text-white mt-4">Register</button>
            <div className="divider">OR</div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Login with Google
            </button>

            <div className="text-center">
              Already have an account?{" "}
              <Link className="text-blue-400" to="/auth/login">Login</Link>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;

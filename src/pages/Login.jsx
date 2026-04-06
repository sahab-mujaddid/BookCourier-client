import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // 🔹 updated import
import { AuthContex } from "../Provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.languageCode = "it";

const Login = () => {
  const { signIn } = useContext(AuthContex); // 🔹 fixed useContext
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      alert("Password should be at least 6 characters");
      return;
    }

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        // 🔹 Save Google user into MongoDB
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          role: "user",
        };

        fetch("https://book-courier-two.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }).catch((err) => console.error("Error saving Google user:", err));

        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="text-3xl text-center font-bold">Login Your Account</div>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input name="email" type="email" className="input" placeholder="Email" required />

              <label className="label">Password</label>
              <input name="password" type="password" className="input" placeholder="Password" required />

              <div><a className="link link-hover">Forgot password?</a></div>
              <button type="submit" className="btn text-white bg-blue-400 mt-4">Login</button>
              <div className="divider">OR</div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Login with Google
              </button>

              <div className="text-center">
                Don't have an account?{" "}
                <Link to="/auth/Registration" className="text-red-500">Register</Link>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContex } from "../Provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();
import { getAuth } from "firebase/auth";
const auth = getAuth();
auth.languageCode = 'it';

const Login =() => {
    const {signIn,signInWithGoogle} = use(AuthContex); 
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    const handleLogin = (e) =>{
        e.preventDefault();
        const form=e.target;
        const email = form.email.value;
        const password = form.password.value;
       
        if(password.length<6){
          alert("password should be at last 6 digit");
          return ;
        }
        signIn(email,password)
        .then((result)=>{
            const user=result.user
           navigate(location?.state ? location.state : "/")
        })
        .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode,errorMessage);
  });

    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    navigate(location?.state ? location.state : "/")
  }).catch((error) => {
   
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;

    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    };
    return(
   <div>
     <div className="hero bg-base-200 min-h-screen">
     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
          <div className="text-3xl text-center font-bold">Login Your Account</div>
        <fieldset className="fieldset">

          <label className="label">Email</label>
          <input name="email" type="email" className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input name="password" type="password" className="input" placeholder="Password" />

          <div><a className="link link-hover">Forgot password?</a></div>
          <button type="submit" className="btn  text-white bg-blue-400 mt-4">Login</button>
          <div className="divider">OR</div>  


                        <button 
                            type="button" 
                            onClick={handleGoogleSignIn} 
                            className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        > Login with Google
                        </button>

          <div className="text-center ">Don't have an account? <Link to="/auth/Registration" className="text-red-500">Register</Link> </div>
        </fieldset>
      </form>
      
    </div>
  
</div>
   </div>
    );
};

export default Login;


import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContex } from "../Provider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
import { getAuth, signInWithPopup } from "firebase/auth";
const auth = getAuth();

const Register =() =>{
    const {createUser,setUser,updateUser} =use(AuthContex);
    const location = useLocation();
    const navigate = useNavigate();
    const handleRegister= (e) =>{
         e.preventDefault();
         console.log(e.target);
         const form=e.target;
         const name=form.name.value;
         const photo=form.photo.value;
         const email=form.email.value;
         const password=form.password.value;
         
         if(password.length<6){
          alert("at last 6 digit");
          return;
         }
           if (!/[A-Z]/.test(password)) {
      alert('Password must contain at least one uppercase letter');
      return;
    }
    if (!/[0-9]/.test(password)) {
      alert('Password must contain at least one number');
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      alert('Password must contain at least one special character');
      return;
    }

         createUser(email,password).then((result) =>{
            const user = result.user;
            updateUser({displayName:name,photoURL:photo}).then(()=>{
              setUser({...user,displayName: name,photoURL: photo});
            }).catch((error) =>{
              setUser(user);
            })
           
            navigate(location?.state ? location.state : "/")

         }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);   
   
  });
    };

      const handleGoogleSignIn = () => {
      signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    
  });
        };
    return(
   <div>
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
          <button type="submit" className="btn  bg-blue-400 text-white mt-4">Register</button>
           <div className="divider">OR</div>  


                        <button 
                            type="button" 
                            onClick={handleGoogleSignIn} 
                            className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        > Login with Google
                        </button>

          <div className="text-center ">Already have an account? <Link className="text-blue-400" to="/auth/login">Login</Link> </div>
        </fieldset>
      </form>
    </div>
  
</div>
   </div>
    );
};

export default Register;
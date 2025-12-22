import React, { use } from "react";
import logo from "../assets/bs.png"
import { Link } from "react-router";
import { AuthContex } from "../Provider/AuthProvider";
const Navbar =()=>{
 const {user,logOut} = use (AuthContex);
    const handlelogout =()=>{
        logOut().then(() => {
            alert("Sign-out successful.")
}).catch((error) => {
  alert("error")
});
     
    }
  
    return(
       <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl"><img className="w-[60px] h-[60px]" src={logo} alt="" /> BookCourier</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      {
      user?<> <li><Link to={"/"}>Home</Link></li>
       <li><Link to={"/Books"}>Books</Link></li>
         <li><Link to={"/Myorder"}>MyOrder</Link></li>
          
        </>
        :""
      } 
    {
       user ? <ul><li className="relative group">
         <label
                tabIndex={0}
                className="cursor-pointer flex items-center gap-2"
              >
                <img
                  src={
                    user.photoURL ||
                    'https://img.daisyui.com/images/profile/demo/gordon@192.webp'
                  }
                  alt={user.displayName || 'User'}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </label>
              <div className="absolute  top-full right-0 mt-2 hidden group-hover:flex flex-col bg-white shadow-lg rounded-md p-2 min-w-[100px] z-10 text-left">
                <Link to={'/Myorder'}>MyOrder</Link>
               
      <button 
        onClick={handlelogout}
        className="text-sm text-red-500 hover:bg-red-50 p-2 rounded text-right"
      >
        Logout
      </button>
    </div>
              </li></ul> 
              
       :<ul><li><Link className="btn text-white bg-blue-400"  to={'/auth/Login'}>Login/Register</Link></li></ul> 
      }
      </ul>
  </div>
</div>  
    );
};
export default Navbar;

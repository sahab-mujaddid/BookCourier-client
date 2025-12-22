import React from "react";
import { Link } from "react-router";
const Footer =()=>{
    return(
      <div>
  <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 mt-8">
  <nav>
    <h6 className="footer-title">Quick Link</h6>
    <Link className="link-hover" to={'/'}>Home</Link>
    <Link className="link-hover" to={'/books'}>Books</Link>
    
  </nav>
  <nav>
    <h6 className="footer-title">Support</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    
  </nav>
  <nav>
    <h6 className="footer-title">Connect</h6>
    <div className="grid grid-flow-col gap-4">
     <a href="https://x.com/home?lang=en" target="_blank" rel="noopener noreferrer">
  <img
    width="50"
    height="50"
    src="https://img.icons8.com/ios-filled/50/twitterx--v1.png"
    alt="twitterx--v1"
  />
</a>
     
    </div>
  </nav>
  
</footer>
<footer className="footer sm:footer-horizontal footer-center bg-base-200 text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by BookCourier</p>
  </aside>
</footer>
      </div>
      
   
    );
};
export default Footer;

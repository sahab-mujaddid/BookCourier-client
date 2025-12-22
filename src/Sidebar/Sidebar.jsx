import React from "react";

const Sidebar =()=>{
    return(
        <div>
        <div className="flex">

           <div className="card card-body w-full bg-base-200 card-body max-w-[12rem] mt-6 pb-66  ">
           <Link to={'/Myorder'}  className="p-4 hover:text-blue-400">My Order</Link> 
                <h1 className="p-4 hover:text-blue-400">My profile</h1>
                <h1 className="p-4 hover:text-blue-400">Invoice</h1>
           </div>
          
        </div>
 
        

        </div>
   
    );
};
export default Sidebar;

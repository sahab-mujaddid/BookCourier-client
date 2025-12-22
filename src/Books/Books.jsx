import React from "react";
import { Link } from "react-router";
import { useLoaderData } from "react-router";
const Books =()=>{
   const Data=useLoaderData();
    return(
        <div>
       <div>
        <h1 className="mt-5 font-bold text-4xl">All Books</h1>
        <p>Browser Our Extensive Collection of titles available for immediate delevery</p>
        <div className="flex justify-end mt-5 gap-2">
       <div>     <label className="input">
 
  <input type="search" required placeholder="Search" />
</label></div>
<div>
    <select className="select select-bordered w-full sm:w-48 ">
            <option>Sort by: Newest Arrivals</option>
            <option>Sort by: Title</option>
            <option>Sort by: Author</option>
          </select>
</div>
 
        </div>
        



       </div>

  <div className="grid grid-cols-4 gap-4 p-6">
  {Data.map(singledata => (
    <Link to={`/Bookdetails/${singledata?._id?.toString()}`}> 
 <div className="card bg-base-100  shadow-sm mt-10">
  <figure>
    <img
      src={singledata.image_url}
      className="w-full h-96 "
       />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {singledata.title}
      
    </h2>
    <h1>{singledata.author}</h1>
      
     <h1><Link to={`/Bookdetails/${singledata?._id?.toString()}`} className="btn btn-primary">View Details</Link></h1>
  </div>
  
</div>
</Link>
       ))}


  </div>
  
  <div class="flex justify-center items-center space-x-2 mt-8">
  <button class="btn btn-sm btn-outline">Prev</button>
  <button class="btn btn-sm btn-primary">1</button>
  <button class="btn btn-sm btn-outline">2</button>
  <button class="btn btn-sm btn-outline">3</button>
  <span class="px-2 text-gray-500">...</span>
  <button class="btn btn-sm btn-outline">8</button>
  <button class="btn btn-sm btn-outline">Next</button>
</div>
        </div>
   
    );
};
export default Books;

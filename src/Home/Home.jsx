import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router";
const Home =()=>{
  const Data=useLoaderData().slice(0,8);
    return(
        <div>
        
 <div
  className="hero  min-h-[50vh]"
  style={{
    backgroundImage:
      "url(https://i.ibb.co.com/DfN7MtF4/janko-ferlic-sf-L-QOnmy00-unsplash.jpg)",
  }}
>
  <div className="hero-overlay p-8">
  <div class="text-white">
  <p class="text-base-200 text-sm">PRIORITY SERVICE</p>
  <h1 class="font-bold text-4xl">Fastest Library-to- <br />Door Delivery</h1>
  <p class="">
    Get your favorite books delivered to your doorstep in record time with our new express fleet.
  </p>
  </div>
</div>

</div>
      
     
  <div className="grid grid-cols-4 gap-4 ">
  {Data.map(singledata => (
    <Link to={`/Bookdetails/${singledata?._id?.toString()}`}><div className="card bg-base-100  shadow-sm mt-10">
  <figure>
    <img
      src={singledata.image_url}
      className="w-full h-64 "
       />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {singledata.title}
      
    </h2>
    <h1>{singledata.author}</h1>
    <h1 className="font-bold">Price:</h1>
     <h1><Link to={`/Bookdetails/${singledata?._id?.toString()}`} className="btn text-white bg-blue-400">View Details</Link> </h1>
  </div>
  
</div>
 </Link>
 
       ))}


  </div>
    
    <div className="mt-8 ">
<div>
      <h1 className="text-center font-bold text-blue-400">Why Choose Book Courier</h1>
      <p className="text-center mb-8">
  We bridge the gap between you and knowledge, making library access as easy as ordering pizza.
</p>

    </div>
      <div className="flex gap-5 ">
        <div className="card bg-base-100  shadow-sm  w-96">
  <div className="card-body">
    <h3 className="text-center font-bold text-blue-400">Same Day Delivery</h3>
     <p className="text-sm">
      Request before 2 PM and get your books delivered the same evening. We value your reading time.
    </p>

    
    <div className="card-actions justify-end">
     
    </div>
  </div>
</div>
<div className="card bg-base-100  shadow-sm  w-96">
  <div className="card-body">
    <h3 className="text-center font-bold text-blue-400">Secure Handling</h3>
    <p> Our couriers are trained to handle books with care. Weather-proof packaging ensures pristine condition.</p>
    <div className="card-actions justify-end">
      
    </div>
  </div>
</div>
<div className="card  bg-base-100  shadow-sm  w-96">
  <div className="card-body ">
    <h2 className="text-center font-bold text-blue-400">Real-time Tracking</h2>
    <p>Track your book’s journey from the library shelf to your front door with our live GPS integration.
</p>
    <div className="card-actions justify-end">
      
    </div>
  </div>
</div>
      </div>
    
    </div>
    
      
        </div>
   
    );
};
export default Home;

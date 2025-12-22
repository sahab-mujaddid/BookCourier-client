import React from "react";
import { Link, useLoaderData, useParams } from "react-router";

const Bookdetails =()=>{
  const { _id } = useParams();         
  const data = useLoaderData();     
  const singleData = data.find(sm => sm._id === _id);
  const {title,image_url,author,pages,summary,
published,star_rating} =singleData;
  console.log(_id);

    return(
       <div class="max-w-4xl mt-4 w-full card bg-base-300 shadow-2xl">
  <div class="card-body flex flex-col md:flex-row gap-8 p-0">
    <figure class="md:w-1/3 flex justify-center items-center bg-base-200 p-8">
     <img src={image_url} alt="" />
    </figure>

    <div class="md:w-2/3 flex flex-col justify-between p-8">
      <div>
        

        <h1 class="card-title text-4xl mb-2">{title}</h1>
        <p class="text-xl text-base-content opacity-70 mb-6">by F. {author}</p>

        <div class="flex flex-wrap items-center gap-6 mb-6 text-sm text-base-content opacity-80">
          <div class="flex items-center gap-2">
            <div class="rating">
              <input type="radio" name="rating" class="mask mask-star-2 bg-yellow-400" checked disabled />
             
            </div>
            <span>Rating {star_rating}</span>
          </div>
          <div>{pages} Pages</div>
          <div>Pulished {published}</div>
        </div>

        <p class="text-base-content opacity-90 leading-relaxed mb-8">
         {summary}
        </p>
      </div>

      <div class="card-actions justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
        <div class="flex items-center gap-2 text-success font-medium">
         
           <Link to={'/BuyForm'} class="btn btn-primary">Order Now</Link>
        </div>

        <div class="flex gap-3">
         
         
        </div>
      </div>
    </div>
  </div>
</div>
    );
};

export default Bookdetails;
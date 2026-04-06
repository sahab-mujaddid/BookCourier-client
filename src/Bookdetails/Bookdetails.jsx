import React from "react";
import { Link, useLoaderData, useParams } from "react-router";

const Bookdetails = () => {
  const { _id } = useParams();         
  const data = useLoaderData();     

  if (!data || !Array.isArray(data)) {
    return <p>No book data available.</p>;
  }

  const singleData = data.find(sm => sm._id === _id);

  if (!singleData) {
    return <p>Book not found.</p>;
  }

  const {
    title,
    image_url,
    author,
    pages,
    summary,
    published,
    star_rating,
    price
  } = singleData;

  return (
    <div className="max-w-4xl mt-4 w-full card bg-base-300 shadow-2xl">
      <div className="card-body flex flex-col md:flex-row gap-8 p-0">
        <figure className="md:w-1/3 flex justify-center items-center bg-base-200 p-8">
          <img src={image_url} alt={title} />
        </figure>

        <div className="md:w-2/3 flex flex-col justify-between p-8">
          <div>
            <h1 className="card-title text-4xl mb-2">{title}</h1>
            <p className="text-xl text-base-content opacity-70 mb-6">by {author}</p>

            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-base-content opacity-80">
              <div className="flex items-center gap-2">
                <div className="rating">
                  <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-yellow-400"
                    checked
                    disabled
                  />
                </div>
                <span>Rating {star_rating}</span>
              </div>
              <div>{pages} Pages</div>
              <div>Published {published}</div>
              <div className="font-semibold text-green-600">Price: ${price}</div>
            </div>

            <p className="text-base-content opacity-90 leading-relaxed mb-8">
              {summary}
            </p>
          </div>

          <div className="card-actions justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 text-success font-medium">
              
              <Link to={`/BuyForm/${_id}`} className="btn btn-primary">
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookdetails;

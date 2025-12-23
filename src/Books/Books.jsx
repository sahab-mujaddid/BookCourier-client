import React, { useState } from "react";
import { Link } from "react-router";
import { useLoaderData } from "react-router";

const Books = () => {
  const Data = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  
  const filteredBooks = Data.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <h1 className="mt-5 font-bold text-4xl">All Books</h1>
        <p>Browse our extensive collection of titles available for immediate delivery</p>

        <div className="flex justify-end mt-5 gap-2">
          <div>
            <label className="input">
              <input
                type="search"
                required
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // ✅ update state
              />
            </label>
          </div>
          <div>
            <select className="select select-bordered w-full sm:w-48">
              <option>Sort by: Newest Arrivals</option>
              <option>Sort by: Title</option>
              <option>Sort by: Author</option>
            </select>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-4 gap-4 p-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((singledata) => (
            <Link key={singledata._id} to={`/Bookdetails/${singledata._id?.toString()}`}>
              <div className="card bg-base-100 shadow-sm mt-10">
                <figure>
                  <img src={singledata.image_url} className="w-full h-96" alt={singledata.title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{singledata.title}</h2>
                  <h1>{singledata.author}</h1>
                  <h1>
                    <Link
                      to={`/Bookdetails/${singledata._id?.toString()}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </h1>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">No books found</p>
        )}
      </div>

      
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button className="btn btn-sm btn-outline">Prev</button>
        <button className="btn btn-sm btn-primary">1</button>
        <button className="btn btn-sm btn-outline">2</button>
        <button className="btn btn-sm btn-outline">3</button>
        <span className="px-2 text-gray-500">...</span>
        <button className="btn btn-sm btn-outline">8</button>
        <button className="btn btn-sm btn-outline">Next</button>
      </div>
    </div>
  );
};

export default Books;
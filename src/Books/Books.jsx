import React, { useState } from "react";
import { Link } from "react-router";
import { useLoaderData } from "react-router";

const Books = () => {
  const Data = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Newest Arrivals");
  const [currentPage, setCurrentPage] = useState(1); 

  const booksPerPage = 8;

  
  const filteredBooks = Data.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "Title") return a.title.localeCompare(b.title);
    if (sortOption === "Author") return a.author.localeCompare(b.author);
    if (sortOption === "Newest Arrivals")
      return new Date(b.timestamp) - new Date(a.timestamp);
    return 0;
  });

  
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = sortedBooks.slice(startIndex, startIndex + booksPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </div>
          <div>
            <select
              className="select select-bordered w-full sm:w-48"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option>Newest Arrivals</option>
              <option>Title</option>
              <option>Author</option>
            </select>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-4 gap-4 p-6">
        {currentBooks.length > 0 ? (
          currentBooks.map((singledata) => (
            <Link key={singledata._id} to={`/Bookdetails/${singledata._id?.toString()}`}>
              <div className="card bg-base-100 shadow-sm mt-10">
                <figure>
                  <img
                    src={singledata.image_url}
                    className="w-full h-96"
                    alt={singledata.title}
                  />
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
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="btn btn-sm btn-outline"
        >
          Prev
        </button>

        
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${
              currentPage === i + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="btn btn-sm btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Books;
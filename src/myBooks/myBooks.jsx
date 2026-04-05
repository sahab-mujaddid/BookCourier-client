import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // 🔹 Load all books added by librarian
  useEffect(() => {
    fetch("http://localhost:3000/librarianbooks")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const handleEdit = (id) => {
    // Navigate to edit page with book ID
    navigate(`/edit-book/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Books</h2>

      {books.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Book Name</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td className="border px-4 py-2">{book.bookName}</td>
                <td className="border px-4 py-2">
                  {book.bookImage ? (
                    <img
                      src={book.bookImage}
                      alt={book.bookName}
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="border px-4 py-2">{book.status}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(book._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No books found.</p>
      )}
    </div>
  );
};

export default MyBooks;

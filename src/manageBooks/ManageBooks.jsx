import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // 🔹 Load all books from librarianbooks collection
  useEffect(() => {
    fetch("http://localhost:3000/librarianbooks")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // 🔹 Unpublish book
  const handleUnpublish = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/librarianbooks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "unpublished" }),
      });

      if (res.ok) {
        setBooks((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "unpublished" } : b))
        );
        alert("Book unpublished successfully!");
      } else {
        alert("Failed to unpublish book.");
      }
    } catch (error) {
      console.error("Error unpublishing book:", error);
      alert("Error unpublishing book.");
    }
  };

  // 🔹 Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/edit-book/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Manage Books</h2>

      {books.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Book Name</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Author</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Price</th>
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
                <td className="border px-4 py-2">{book.author}</td>
                <td className="border px-4 py-2">{book.status}</td>
                <td className="border px-4 py-2">{book.price}</td>
                <td className="border px-4 py-2 space-x-2 text-center">
                  <button
                    onClick={() => handleEdit(book._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  {book.status === "published" && (
                    <button
                      onClick={() => handleUnpublish(book._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Unpublish
                    </button>
                  )}
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

export default ManageBooks;

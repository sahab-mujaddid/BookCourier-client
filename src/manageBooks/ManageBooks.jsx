import React, { useEffect, useState } from "react";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all books from librarianbooks collection
  useEffect(() => {
    fetch("https://book-courier-two.vercel.app/librarianbooks")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const bookToProcess = books.find((b) => b._id === id);
    if (!bookToProcess) {
      alert("Book data not found in state.");
      return;
    }

    try {
      // ✅ Update status in librarianbooks
      const res = await fetch(
        `https://book-courier-two.vercel.app/librarianbooks/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        if (newStatus === "published") {
          // Insert into models collection
          await fetch("https://book-courier-two.vercel.app/models", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: bookToProcess.bookName,
              author: bookToProcess.author,
              image_url: bookToProcess.bookImage,
              price: bookToProcess.price,
              category: bookToProcess.category,
              status: "published",
            }),
          });
        } else if (newStatus === "unpublished") {
          // ✅ Delete from models collection
          await fetch(`https://book-courier-two.vercel.app/models/${id}`, {
            method: "DELETE",
          });
        }

        // Update local state
        setBooks((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
        );

        alert(`Book ${newStatus} successfully!`);
      } else {
        alert("Failed to update status in librarianbooks.");
      }
    } catch (error) {
      console.error("Error during status change:", error);
      alert("An error occurred while updating the book.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading books...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Librarian Books</h2>

      {books.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                <th className="border px-4 py-3">Image</th>
                <th className="border px-4 py-3">Book Name</th>
                <th className="border px-4 py-3">Author</th>
                <th className="border px-4 py-3">Price</th>
                <th className="border px-4 py-3">Status</th>
                <th className="border px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50 transition">
                  <td className="border px-4 py-2 text-center">
                    <img
                      src={book.bookImage || "https://via.placeholder.com/150"}
                      alt={book.bookName}
                      className="w-12 h-16 object-cover mx-auto rounded shadow-sm"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium">{book.bookName}</td>
                  <td className="border px-4 py-2">{book.author}</td>
                  <td className="border px-4 py-2 text-green-600 font-bold">
                    ${book.price}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        book.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {book.status === "published" ? (
                      <button
                        onClick={() => handleStatusChange(book._id, "unpublished")}
                        className="px-4 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
                      >
                        Unpublish
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(book._id, "published")}
                        className="px-4 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                      >
                        Publish
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No books available to manage.</p>
      )}
    </div>
  );
};

export default ManageBooks;

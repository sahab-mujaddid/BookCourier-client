import React, { useState } from "react";

const AddBooks = () => {
  const [bookName, setBookName] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("unpublished");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      bookName,
      bookImage,
      author,
      status,
      price: parseFloat(price),
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3000/librarianbooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (res.ok) {
        alert("Book added successfully!");
        // reset form
        setBookName("");
        setBookImage("");
        setAuthor("");
        setStatus("unpublished");
        setPrice("");
      } else {
        alert("Failed to add book.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Book Name</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Book Image URL</label>
          <input
            type="text"
            value={bookImage}
            onChange={(e) => setBookImage(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBooks;

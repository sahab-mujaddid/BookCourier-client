import React, { useContext } from "react";
import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContex } from "../Provider/AuthProvider"; 

const BuyForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContex); 
  const { id } = useParams();              // book id from route
  const data = useLoaderData();            // loader provides book list
  const book = data?.find(b => b._id === id);

  if (!book) {
    return <p className="text-red-500">Book not found.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const orderData = {
      name: form.name.value,
      email: user?.email || form.email.value, 
      phone: form.phone.value,
      address: form.address.value,
      timestamp: new Date().toISOString(),
      status: "pending",
      // ✅ include book info
      bookId: book._id,
      bookTitle: book.title,
      bookPrice: book.price
    };

    try {
      const res = await fetch("https://book-courier-two.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        toast.success("Order confirmed! Redirecting to home...");
        form.reset();
        navigate("/");   // ✅ redirect to home page
      } else {
        toast.error("Failed to save order.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Error submitting order.");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-96 shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <h2 className="text-xl font-bold mb-4">
              Ordering: {book.title} (${book.price})
            </h2>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input name="name" type="text" className="input" placeholder="Name" required />

              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                defaultValue={user?.email || ""}
                readOnly={!!user?.email}
                required
              />

              <label className="label">Phone</label>
              <input name="phone" type="text" className="input" placeholder="Phone" required />

              <label className="label">Address</label>
              <input name="address" type="text" className="input" placeholder="Address" required />

              <button type="submit" className="btn bg-blue-400 mt-4 text-white">
                Order Now
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyForm;

import React from "react";
import { useNavigate } from "react-router-dom";   // ✅ fixed import
import { toast } from "react-toastify";

const BuyForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const orderData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      timestamp: new Date().toISOString(),
    };

    try {
      // ✅ Send order to backend instead of localStorage
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        toast.success("Order confirmed! Check dashboard.");
        form.reset();
        navigate("/");   // ✅ redirect after success
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
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input name="name" type="text" className="input" placeholder="Name" required />

              <label className="label">Email</label>
              <input name="email" type="email" className="input" placeholder="Email" required />

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

import React from "react";
import { Link, Navigate, useNavigate } from "react-router";

const BuyForm = () => {
    const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const orderData = {
      name,
      email,
      phone,
      address,
      timestamp: new Date().toISOString(),
    };

    
    localStorage.setItem("bookCourierOrder", JSON.stringify(orderData));

   
    form.reset();
     navigate("/Myorder");

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

              <button type="submit"  className="btn bg-blue-400 mt-4 text-white">
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
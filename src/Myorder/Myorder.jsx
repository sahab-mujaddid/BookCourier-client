import React, { useEffect, useState, useContext } from "react";
import { AuthContex } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Myorder = () => {
  const { user } = useContext(AuthContex);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`https://book-courier-two.vercel.app/orders?email=${user.email}`);
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [user?.email]);

  // Cancel order
  const handleCancel = async (id) => {
    try {
      await fetch(`https://book-courier-two.vercel.app/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: "cancelled" } : o))
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  // Pay order
  const handlePay = async (id) => {
    navigate(`/payment/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found for {user?.email}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                <th>Book</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-blue-50">
                  <td>
                    <div>
                      <p className="font-semibold">{order.bookTitle}</p>
                      <p className="text-sm text-gray-500">Ref: #{order._id}</p>
                    </div>
                  </td>
                  <td>{new Date(order.timestamp).toLocaleString()}</td>
                  <td>
                    {order.status === "pending" && (
                      <span className="badge badge-warning">Pending</span>
                    )}
                    {order.status === "paid" && (
                      <span className="badge badge-success">Paid</span>
                    )}
                    {order.status === "cancelled" && (
                      <span className="badge badge-error">Cancelled</span>
                    )}
                  </td>
                  <td>${order.bookPrice || "0.00"}</td>
                  <td className="space-x-2">
                    {order.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handlePay(order._id)}
                          className="btn btn-sm btn-primary"
                        >
                          Pay Now
                        </button>
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="btn btn-sm btn-error"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400">No actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Myorder;

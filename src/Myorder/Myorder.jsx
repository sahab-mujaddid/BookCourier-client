import React, { useEffect, useState } from "react";

const MyOrder = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
   
    const storedOrder = localStorage.getItem("bookCourierOrder");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  return (
    
    <div className="p-6">
      
      <h2 className="text-2xl font-bold mb-2">My Orders</h2>
      <p className="text-sm text-gray-500 mb-4">
        Manage your book deliveries, track shipments, and handle payments.
      </p>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Customer Details</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Total Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {order ? (
              <tr>
                <td>
                  <div>
                    <div className="font-semibold">{order.name}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                    <div className="text-xs text-gray-400">
                      Phone: {order.phone}
                    </div>
                    <div className="text-xs text-gray-400">
                      Address: {order.address}
                    </div>
                  </div>
                </td>
                <td>{new Date(order.timestamp).toLocaleString()}</td>
                <td>
                  <span className="badge badge-warning">Pending</span>
                </td>
                <td>$5.00</td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-success">Pay Now</button>
                  <button className="btn btn-sm btn-error">Cancel</button>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
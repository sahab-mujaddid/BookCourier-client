import React, { useEffect, useState, useContext } from "react";
import { AuthContex } from "../Provider/AuthProvider";

const Invoice = () => {
  const { user } = useContext(AuthContex);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/orders?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setInvoices(data))
        .catch((err) => console.error("Error fetching invoices:", err));
    }
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Invoices</h2>

      {invoices.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Payment ID</th>
              <th className="border px-4 py-2">Book Name</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td className="border px-4 py-2">{invoice._id}</td>
                <td className="border px-4 py-2">{invoice.bookName || "N/A"}</td>
                <td className="border px-4 py-2">{invoice.amount || "—"}</td>
                <td className="border px-4 py-2">
                  {invoice.timestamp
                    ? new Date(invoice.timestamp).toLocaleDateString()
                    : "—"}
                </td>
                <td className="border px-4 py-2">
                  {invoice.paid ? "Paid" : invoice.status || "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No invoices found.</p>
      )}
    </div>
  );
};

export default Invoice;

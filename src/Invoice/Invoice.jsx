import React, { useEffect, useState, useContext } from "react";
import { AuthContex } from "../Provider/AuthProvider";

const Invoice = () => {
  const { user } = useContext(AuthContex);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://book-courier-two.vercel.app/orders?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setInvoices(data))
        .catch((err) => console.error("Error fetching invoices:", err));
    }
  }, [user]);

  // ✅ Calculate grand total of all invoices
  const grandTotal = invoices.reduce(
    (sum, inv) => sum + (Number(inv.bookPrice) || 0),
    0
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Invoices</h2>

      {invoices.length > 0 ? (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Invoice ID</th>
                <th className="border px-4 py-2">Book Name</th>
                <th className="border px-4 py-2">Book Price</th>
                <th className="border px-4 py-2">Total Cost</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => {
                const totalCost = invoice.totalCost || invoice.bookPrice || 0;
                return (
                  <tr key={invoice._id}>
                    <td className="border px-4 py-2">{invoice._id}</td>
                    <td className="border px-4 py-2">{invoice.bookTitle || "N/A"}</td>
                    <td className="border px-4 py-2">${invoice.bookPrice || "0.00"}</td>
                    <td className="border px-4 py-2">${totalCost}</td>
                    <td className="border px-4 py-2">
                      {invoice.timestamp
                        ? new Date(invoice.timestamp).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="border px-4 py-2">
                      {invoice.paid ? "Paid" : invoice.status || "Pending"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* ✅ Show grand total at the bottom */}
          <div className="mt-4 text-right font-bold text-lg">
            Grand Total: ${grandTotal.toFixed(2)}
          </div>
        </>
      ) : (
        <p className="text-gray-600">No invoices found.</p>
      )}
    </div>
  );
};

export default Invoice;

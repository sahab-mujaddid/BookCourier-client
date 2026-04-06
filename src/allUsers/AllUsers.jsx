import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  // 🔹 Load all users
  useEffect(() => {
    fetch("https://book-courier-two.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // 🔹 Update role
  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await fetch(`https://book-courier-two.vercel.app/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
        );
        alert("Role updated successfully!");
      } else {
        alert("Failed to update role.");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Error updating role.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {users.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">UID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Photo</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="border px-4 py-2">{u.uid}</td>
                <td className="border px-4 py-2">{u.displayName || "—"}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2">
                  {u.photoURL ? (
                    <img
                      src={u.photoURL}
                      alt="User"
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="border px-4 py-2">{u.role}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleRoleChange(u._id, "user")}
                    className="w-24 px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    User
                  </button>
                  <button
                    onClick={() => handleRoleChange(u._id, "librarian")}
                    className="w-24 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Librarian
                  </button>
                  <button
                    onClick={() => handleRoleChange(u._id, "admin")}
                    className="w-24 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No users found.</p>
      )}
    </div>
  );
};

export default AllUsers;

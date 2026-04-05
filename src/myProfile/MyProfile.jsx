import React, { useContext, useState } from "react";
import { AuthContex } from "../Provider/AuthProvider";

const MyProfile = () => {
  const { user, updateUser, setUser } = useContext(AuthContex);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // ✅ Update Firebase profile
      await updateUser({ displayName: name, photoURL: photo });

      // ✅ Update MongoDB record
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: name,
        photoURL: photo,
        role: user.role || "user",
      };

      await fetch(`http://localhost:3000/users/${user.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      // ✅ Update context
      setUser({ ...user, displayName: name, photoURL: photo });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {user ? (
        <>
          <div className="mb-4 text-center">
            <img
              src={user.photoURL || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <p className="mt-2 font-semibold">{user.displayName || "No name set"}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-blue-500">Role: {user.role}</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium">Photo URL</label>
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Update Profile
            </button>
          </form>
        </>
      ) : (
        <p className="text-center text-gray-600">No user logged in.</p>
      )}
    </div>
  );
};

export default MyProfile;

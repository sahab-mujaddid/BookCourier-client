import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContex } from "../Provider/AuthProvider";

const DashboardLayout = () => {
  const location = useLocation();
  const { user, logOut } = useContext(AuthContex);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-500 text-white rounded-md"
      : "hover:bg-blue-100 rounded-md transition";

  return (
    <div className="min-h-screen bg-base-100">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          <header className="navbar w-full bg-white border-b border-base-200 lg:px-6 shadow-sm">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>

            <div className="flex-1 hidden lg:block">
              <h2 className="text-sm breadcrumbs font-normal text-gray-500">
                Dashboard / {location.pathname.split("/").pop() || "Overview"}
              </h2>
            </div>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || "https://i.pravatar.cc/100"} alt="User Avatar" />
                </div>
              </label>
              <ul tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><button onClick={logOut}>Logout</button></li>
              </ul>
            </div>
          </header>

          <main className="p-6 bg-base-200/50 grow">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-40">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-64 min-h-full bg-gradient-to-b from-blue-50 to-blue-100 border-r border-base-200">
            <h1 className="text-2xl font-black italic text-primary mb-6">BookCourier</h1>
            <ul className="space-y-2 font-medium">
              <li>
                <Link to="/" className={`flex items-center gap-3 p-2 ${isActive("/")}`}>
                  Home
                </Link>
              </li>

              {/* User-only links */}
              {user?.role === "user" && (
                <>
                  <li>
                    <Link to="/dashboard/myorder" className={`flex items-center gap-3 p-2 ${isActive("/dashboard/myorder")}`}>
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/myprofile" className={`flex items-center gap-3 p-2 ${isActive("/dashboard/myprofile")}`}>
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/invoice" className={`flex items-center gap-3 p-2 ${isActive("/dashboard/invoice")}`}>
                      Invoice
                    </Link>
                  </li>
                </>
              )}

              {/* Librarian-only links */}
              {user?.role === "librarian" && (
                <>
                  <div className="divider opacity-50">Librarian</div>
                  <li>
                    <Link to="/dashboard/addbook" className={`flex items-center gap-3 p-2 ${isActive("/dashboard/addbook")}`}>
                      Add Book
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/mybooks" className={`flex items-center gap-3 p-2 ${isActive("/dashboard/mybooks")}`}>
                      My Books
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/dashboard/librarianorder" className={`flex items-center gap-3 p-2 ${isActive("/dashboard/librarianorder")}`}>
                      Orders
                    </Link>
                  </li> */}
                </>
              )}

              {/* Admin-only links */}
              {user?.role === "admin" && (
                <>
                  <div className="divider opacity-50">Admin</div>
                  <li>
                    <Link to="/dashboard/allusers" className={`flex items-center gap-3 p-2 ${isActive("/dashboard/allusers")}`}>
                      All Users
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/managebooks" className={`flex items-center gap-3 p-2 ${isActive("/dashboard/managebooks")}`}>
                      Manage Books
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/myprofile" className={`flex items-center gap-3 p-2 ${isActive("/dashboard/myprofile")}`}>
                      My Profile
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

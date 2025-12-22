import React from "react";
import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-base-200">
      <div className="w-64 bg-base-100 shadow-xl p-4">
        <div className="flex items-center gap-2 mb-8 px-2">
        </div>
        <ul className="menu menu-vertical gap-2">
          <li><Link to="/Myorder">My Order</Link></li>
          <li><Link to="/dashboard/profile">My Profile</Link></li>
          <li><Link to="/dashboard/invoice">Invoice</Link></li>
        </ul>
      </div>

      
      <div className="flex-1 p-8">
        <Outlet /> 
      </div>
    </div>
  );
};

export default DashboardLayout;
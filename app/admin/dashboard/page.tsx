import React from "react";
import {
  FaUsers,
  FaProjectDiagram,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";
import Link from "next/link";

const page = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Page Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="font-semibold text-gray-800 text-xl md:hidden">
          Admin Dashboard
        </h1>
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <FaCog className="text-xl" />
        </button>
      </header>

      {/* Dashboard Overview Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">Active Users</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Current Projects
          </h3>
          <p className="text-3xl font-bold text-green-600">15</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">Server Uptime</h3>
          <p className="text-3xl font-bold text-red-600">99.9%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">New Sign-ups</h3>
          <p className="text-3xl font-bold text-yellow-600">50</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Link href="/admin/users">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-blue-700">
            <FaUsers className="text-4xl mb-3" />
            <h3 className="text-xl font-semibold">Manage Users</h3>
          </div>
        </Link>
        <Link href="/admin/projects">
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-green-700">
            <FaProjectDiagram className="text-4xl mb-3" />
            <h3 className="text-xl font-semibold">Manage Projects</h3>
          </div>
        </Link>
        <Link href="/admin/system">
          <div className="bg-orange-600 text-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-orange-700">
            <FaClipboardList className="text-4xl mb-3" />
            <h3 className="text-xl font-semibold">System Health</h3>
          </div>
        </Link>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span>New user registration</span>
              <span className="text-gray-500">2 hours ago</span>
            </li>
            <li className="flex justify-between">
              <span>New project launched: AI Research</span>
              <span className="text-gray-500">5 hours ago</span>
            </li>
            <li className="flex justify-between">
              <span>System update completed</span>
              <span className="text-gray-500">1 day ago</span>
            </li>
            <li className="flex justify-between">
              <span>New API request spike</span>
              <span className="text-gray-500">3 days ago</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default page;

"use client";

import { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaRegNewspaper,
  FaBullhorn,
  FaLightbulb,
  FaCalendarAlt,
} from "react-icons/fa"; // Import icons
import AnimatedLayout from "@/components/AnimatedBlogPages";

const BlogsLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="text-gray-800 py-8 text-center shadow-sm relative">
        <h1 className="text-5xl font-extrabold text-blue-700">Our Blog</h1>
        <p className="text-lg mt-3 text-gray-700 max-w-2xl mx-auto">
          Stay informed with the latest updates, insights, and stories from Weva
          Tech.
        </p>
        <div
          className="pattern-paper pattern-blue-500 bg-gradient-to-tr from-blue-100 via-white to-gray-50 
            pattern-size-12 pattern-opacity-30 absolute inset-0 z-0"
        ></div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 py-4 sticky top-0 z-10">
        <ul className="flex justify-center space-x-8 sm:space-x-6 md:space-x-12">
          <li>
            <Link
              href="/blogs"
              className={`${
                pathname === "/blogs"
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "text-gray-600"
              } flex items-center space-x-2 hover:text-blue-700 transition duration-200 pb-1`}
            >
              <FaRegNewspaper className="text-xl" />
              <span className="hidden sm:inline">Latest Posts</span>
            </Link>
          </li>
          <li>
            <Link
              href="/blogs/announcements"
              className={`${
                pathname === "/blogs/announcements"
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "text-gray-600"
              } flex items-center space-x-2 hover:text-blue-700 transition duration-200 pb-1`}
            >
              <FaBullhorn className="text-xl" />
              <span className="hidden sm:inline">Announcements</span>
            </Link>
          </li>
          <li>
            <Link
              href="/blogs/insights"
              className={`${
                pathname === "/blogs/insights"
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "text-gray-600"
              } flex items-center space-x-2 hover:text-blue-700 transition duration-200 pb-1`}
            >
              <FaLightbulb className="text-xl" />
              <span className="hidden sm:inline">Insights</span>
            </Link>
          </li>
          <li>
            <Link
              href="/blogs/events"
              className={`${
                pathname === "/blogs/events"
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "text-gray-600"
              } flex items-center space-x-2 hover:text-blue-700 transition duration-200 pb-1`}
            >
              <FaCalendarAlt className="text-xl" />
              <span className="hidden sm:inline">Events</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <AnimatedLayout>{children}</AnimatedLayout>
      </main>
    </div>
  );
};

export default BlogsLayout;

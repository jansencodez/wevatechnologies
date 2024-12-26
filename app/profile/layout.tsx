"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaUserEdit,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

// Create a mapping of pathnames to indices
const pageIndexMap: Record<string, number> = {
  "/profile": 0,
  "/profile/edit": 1,
  "/profile/settings": 2,
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const previousPageIndex = useRef<number | null>(null);

  // Determine the index of the current page
  const pageIndex = pageIndexMap[pathname] ?? 0; // Default to 0 if page not found

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (mainContentRef.current) {
      const currentIndex = pageIndex;
      const duration = 0.5; // Set the duration for the animation
      let yOffset = "0%";

      // Determine the animation direction based on the page index change
      if (previousPageIndex.current !== null) {
        if (currentIndex > previousPageIndex.current) {
          // Moving from a lower index to a higher one (slide in from right)
          yOffset = "100%";
        } else if (currentIndex < previousPageIndex.current) {
          // Moving from a higher index to a lower one (slide in from left)
          yOffset = "-100%";
        }
      }

      // Perform the animation
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0, y: yOffset }, // Start from invisible and off-screen
        {
          opacity: 1,
          y: "0%", // Move to the original position
          duration, // Apply the custom duration
          ease: "power3.out", // Ease out for smoother transitions
        }
      );

      // Store the current page index for the next transition
      previousPageIndex.current = currentIndex;
    }
  }, [pathname, pageIndex]); // Trigger animation when page changes

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-20 bg-gradient-to-b from-gray-100 to-gray-200 p-6 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 shadow-lg border-r border-gray-300`}
      >
        <button
          className="lg:hidden absolute top-4 right-4 text-gray-600"
          onClick={toggleSidebar}
        >
          <FaTimes size={24} />
        </button>
        <nav className="mt-8 space-y-6">
          <ul className="space-y-4">
            <li>
              <Link href="/profile">
                <span className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-200 p-2 rounded-lg transition-all duration-200 ease-in-out">
                  <FaTachometerAlt />
                  <span>Dashboard</span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/profile/edit">
                <span className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-200 p-2 rounded-lg transition-all duration-200 ease-in-out">
                  <FaUserEdit />
                  <span>Edit Profile</span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/profile/settings">
                <span className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-200 p-2 rounded-lg transition-all duration-200 ease-in-out">
                  <FaCog />
                  <span>Settings</span>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 lg:ml-6">
        <header className="bg-white shadow-lg p-4 flex items-center justify-between lg:hidden">
          <h1 className="text-xl font-bold text-gray-700">Profile</h1>
          <button onClick={toggleSidebar} className="text-gray-600">
            <FaBars size={24} />
          </button>
        </header>
        <div ref={mainContentRef} className="p-6 bg-white rounded-lg shadow-md">
          {children}
        </div>
      </main>
    </div>
  );
}

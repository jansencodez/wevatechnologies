"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuthStore } from "@/store/auth";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, clearAuth } = useAuthStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="flex items-center hover:text-gray-600 transition"
          >
            <Image
              src="/images/logo.png"
              alt="Weva Tech Logo"
              width={400}
              height={200}
              className="w-16 h-16"
            />
            <span
              className="text-2xl font-bold tracking-wide ml-2 bg-gradient-to-tr from-black to-[#2AB7D7]
            inline-block text-transparent bg-clip-text"
            >
              Weva Tech
            </span>
          </Link>
        </div>

        {/* Hamburger Icon (mobile) */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-900 focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-8 text-lg">
            <li>
              <Link
                href="/"
                className="group relative inline-block hover:text-gray-600 transition"
              >
                <span className="relative z-10">Home</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="group relative inline-block hover:text-gray-600 transition"
              >
                <span className="relative z-10">Services</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className="group relative inline-block hover:text-gray-600 transition"
              >
                <span className="relative z-10">Blogs</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  href="/profile"
                  className="group relative inline-block hover:text-gray-600 transition"
                  onClick={closeMenu}
                >
                  <span className="relative z-10">Profile</span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            )}
            {user && (
              <li>
                <button
                  className="group relative inline-block hover:text-gray-600 transition"
                  onClick={() => {
                    clearAuth();
                    closeMenu();
                  }}
                >
                  <span className="relative z-10">Logout</span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
            )}
            {!user && (
              <li>
                <Link
                  href="/login"
                  className="group relative inline-block hover:text-gray-600 transition"
                  onClick={closeMenu}
                >
                  <span className="relative z-10">Login</span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link
                  href="/signup"
                  className="group relative inline-block hover:text-gray-600 transition"
                  onClick={closeMenu}
                >
                  <span className="relative z-10">Signup</span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/contact-us"
                className="group relative inline-block hover:text-gray-600 transition"
              >
                <span className="relative z-10">Contact</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={closeMenu}
      ></div>
      <nav
        className={`fixed top-0 left-0 w-64 h-full bg-gray-300 shadow-lg z-50 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <span className="text-xl font-bold">Menu</span>
          <button
            onClick={closeMenu}
            className="text-gray-900 focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <ul className="flex flex-col items-start p-4 space-y-4">
          <li>
            <Link
              href="/"
              className="group relative inline-block hover:text-gray-600 transition"
              onClick={closeMenu}
            >
              <span className="relative z-10">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="group relative inline-block hover:text-gray-600 transition"
              onClick={closeMenu}
            >
              <span className="relative z-10">Services</span>
            </Link>
          </li>
          <li>
            <Link
              href="/blogs"
              className="group relative inline-block hover:text-gray-600 transition"
              onClick={closeMenu}
            >
              <span className="relative z-10">Blogs</span>
            </Link>
          </li>
          {user && (
            <li>
              <Link
                href="/profile"
                className="group relative inline-block hover:text-gray-600 transition"
                onClick={closeMenu}
              >
                <span className="relative z-10">Profile</span>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <button
                className="group relative inline-block hover:text-gray-600 transition"
                onClick={() => {
                  clearAuth();
                  closeMenu();
                }}
              >
                <span className="relative z-10">Logout</span>
              </button>
            </li>
          )}
          {!user && (
            <li>
              <Link
                href="/login"
                className="group relative inline-block hover:text-gray-600 transition"
                onClick={closeMenu}
              >
                <span className="relative z-10">Login</span>
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link
                href="/signup"
                className="group relative inline-block hover:text-gray-600 transition"
                onClick={closeMenu}
              >
                <span className="relative z-10">Signup</span>
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/contact-us"
              className="group relative inline-block hover:text-gray-600 transition"
              onClick={closeMenu}
            >
              <span className="relative z-10">Contact</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;

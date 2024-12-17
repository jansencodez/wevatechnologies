"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <>
          <div
            onClick={closeMenu}
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          ></div>
          <nav className="lg:hidden absolute top-16 left-0 w-full bg-gray-300 shadow-lg z-50">
            <ul className="flex flex-col items-center py-4 space-y-4">
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
      )}
    </>
  );
};

export default NavBar;

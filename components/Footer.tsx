"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const [date, setDate] = useState<number | null>(null);

  // Set the current year once the component has mounted
  useEffect(() => {
    setDate(new Date().getFullYear()); // Update the date state after the component mounts
  }, []);

  // If date is null (still waiting for useEffect to run), render nothing or fallback content
  if (date === null) {
    return (
      <footer className="bg-gray-800 text-gray-300 py-6 bottom-0 w-full h-fit">
        Loading...
      </footer>
    );
  }

  return (
    <footer className="bg-gray-800 text-gray-300 py-6 bottom-0 w-full h-fit">
      <div className="container mx-auto text-center flex flex-col">
        {/* Logo Section */}
        <div className="flex justify-center items-center mb-4 bg-white max-w-fit self-center p-4 rounded-3xl">
          <Image
            src="/images/logo.png"
            alt="Weva Tech Logo"
            width={50}
            height={50}
            className="w-12 h-12"
          />
        </div>

        {/* Footer Text */}
        <p className="text-lg">&copy; {date} Weva Tech. All rights reserved.</p>
        <p className="text-sm mt-2">Designed by Weva Tech.</p>

        {/* Footer Navigation */}
        <nav className="mt-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-white transition">
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

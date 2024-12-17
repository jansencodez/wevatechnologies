"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { errorStyle } from "./styles/admin-login";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/Loader";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setError(""); // Clear previous error messages

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("token", data.access_token);
        sessionStorage.setItem("refresh_token", data.refresh_token);

        router.push("/admin/dashboard"); // Redirect to dashboard
        setLoading(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid login credentials.");
      }
    } catch (err: unknown) {
      if (err instanceof Error)
        setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg"
      >
        <div className="flex justify-center items-center mb-6 bg-gray-50 p-4 rounded-full">
          <Image
            src="/images/logo.png"
            alt="Weva Tech Logo"
            width={50}
            height={50}
            className="w-16 h-16"
          />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Admin Login
        </h1>
        {error && <p className={`${errorStyle} text-center`}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          {!loading ? "Log In" : <Loader />}
        </button>

        <Link
          href="/"
          className="w-full mt-4 text-sm text-center text-gray-600 hover:text-blue-600 hover:underline transition-all duration-300"
        >
          Back to Home
        </Link>
      </form>
    </div>
  );
};

export default AdminLogin;

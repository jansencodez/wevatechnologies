"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/Loader";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";

type AuthState = {
  setTokens: (tokens: { access: string; refresh: string }) => void;
};

const SignUpScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const setTokens = useAuthStore((state: AuthState) => state.setTokens);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (phone) formData.append("phone", phone);
    if (bio) formData.append("bio", bio);
    if (profilePicture) formData.append("profile_picture", profilePicture);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 400) {
        throw new Error(response.data.detail || "Error registering user.");
      }

      // Assuming the response contains user data and token
      const { access_token, refresh_token } = response.data;

      setTokens({ access: access_token, refresh: refresh_token });

      router.push("/profile"); // Redirect to homepage or dashboard
    } catch (err: unknown) {
      if (err instanceof Error)
        setError(err.message || "Error registering user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Sign Up
        </h1>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone (optional)</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Bio (optional)</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Profile Picture (optional)
            </label>
            <input
              type="file"
              onChange={(e) => setProfilePicture(e.target.files?.[0] ?? null)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {loading ? <Loader /> : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;

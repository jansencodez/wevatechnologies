"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

const ContentLoader = dynamic(() => import("react-content-loader"), {
  ssr: false,
});

export default function Dashboard() {
  const { tokens, user, setUser, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUserProfile = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokens?.access}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch user profile");
      const data = await response.json();
      setUser(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [tokens, setUser]);

  useEffect(() => {
    if (!tokens?.access) {
      router.push("/login"); // Redirect if not logged in
    } else {
      fetchUserProfile();
    }
  }, [tokens, router, fetchUserProfile]);

  const handleDeleteAccount = async () => {
    if (!user || !tokens) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        }
      );

      if (response.ok) {
        clearAuth();
        router.push("/");
      } else {
        throw new Error("Failed to delete account");
      }
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ContentLoader viewBox="0 0 400 300" height={300} width={400}>
          {/* Placeholder for profile image */}
          <circle cx="50" cy="50" r="40" />
          {/* Placeholder for name and email */}
          <rect x="100" y="30" rx="4" ry="4" width="250" height="10" />
          <rect x="100" y="50" rx="4" ry="4" width="200" height="10" />
          {/* Placeholder for phone and bio */}
          <rect x="100" y="80" rx="4" ry="4" width="150" height="10" />
          <rect x="100" y="100" rx="4" ry="4" width="250" height="10" />
          {/* Placeholder for buttons */}
          <rect x="0" y="150" rx="4" ry="4" width="150" height="40" />
          <rect x="180" y="150" rx="4" ry="4" width="150" height="40" />
        </ContentLoader>
      </div>
    );
  }

  if (error)
    return <p className="text-center text-red-500 mt-4">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {user.profile_picture ? (
            <Image
              src={user.profile_picture}
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-gray-200"
              width={128}
              height={128}
            />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-gray-200 flex items-center justify-center bg-gray-300 text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Welcome, {user.name}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <p className="text-gray-700">
            <strong>Phone:</strong> {user.phone || "Not provided"}
          </p>
          <p className="text-gray-700">
            <strong>Bio:</strong> {user.bio || "No bio available"}
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className="px-5 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
            onClick={() => router.push("/profile/edit")}
          >
            Edit Profile
          </button>
          <button
            className="px-5 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/Loader";

export default function EditProfile() {
  const { user, tokens, setUser } = useAuthStore();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    bio: string;
    profile_picture: string | File | null;
  }>({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    profile_picture: user?.profile_picture || null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        profile_picture: file, // Store the file directly
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);

    // Include optional fields only if they have values
    if (formData.phone) formDataToSend.append("phone", formData.phone);
    if (formData.bio) formDataToSend.append("bio", formData.bio);

    // If there's a profile picture, append it to the FormData
    if (formData.profile_picture instanceof File) {
      formDataToSend.append("profile_picture", formData.profile_picture);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/details/${user?.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${tokens?.access}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();
      setUser(updatedUser.user); // Assuming the response includes updated user data
      router.push("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <div className="bg-white shadow-md rounded-lg p-2 lg:p-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Profile
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div>
              <Image
                src={
                  typeof formData.profile_picture === "string"
                    ? formData.profile_picture
                    : formData.profile_picture instanceof File
                    ? URL.createObjectURL(formData.profile_picture)
                    : "/default-profile.png"
                }
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-gray-200"
                width={128}
                height={128}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="profile_picture"
              >
                Update Profile Picture
              </label>
              <input
                type="file"
                id="profile_picture"
                className="block text-gray-600"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="bio"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              className={`px-6 py-2 text-white font-medium rounded ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? <Loader /> : "Save Changes"}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 font-medium rounded hover:bg-gray-300"
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

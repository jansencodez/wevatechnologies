"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext"; // Assuming you're using context to manage theme
import { useRouter } from "next/navigation";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAuthStore } from "../../store/auth"; // Assuming you're using store to manage authentication

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme(); // Assuming theme is managed in context
  const router = useRouter();
  const { clearAuth, user, tokens } = useAuthStore(); // Assuming you're using a global store for auth

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isOtherSettingsOpen, setIsOtherSettingsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const handleProfileToggle = () => setIsProfileOpen(!isProfileOpen);
  const handleThemeToggle = () => setIsThemeOpen(!isThemeOpen);
  const handleOtherSettingsToggle = () =>
    setIsOtherSettingsOpen(!isOtherSettingsOpen);
  const handleAccountToggle = () => setIsAccountOpen(!isAccountOpen);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

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
        router.push("/register");
      } else {
        throw new Error("Failed to delete account");
      }
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h1>

        {/* Profile Section */}
        <div className="border-b pb-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={handleProfileToggle}
          >
            <h2 className="text-lg font-semibold text-gray-800">
              Profile Settings
            </h2>
            {isProfileOpen ? (
              <IoIosArrowUp className="text-gray-600" />
            ) : (
              <IoIosArrowDown className="text-gray-600" />
            )}
          </div>
          {isProfileOpen && (
            <div className="space-y-4">
              <button
                className="w-full px-6 py-2 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all"
                onClick={() => router.push("/profile/edit")}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Theme Section */}
        <div className="border-b pb-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={handleThemeToggle}
          >
            <h2 className="text-lg font-semibold text-gray-800">
              Theme Settings
            </h2>
            {isThemeOpen ? (
              <IoIosArrowUp className="text-gray-600" />
            ) : (
              <IoIosArrowDown className="text-gray-600" />
            )}
          </div>
          {isThemeOpen && (
            <div className="space-y-4">
              <button
                className="w-full px-6 py-2 text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all"
                onClick={toggleTheme}
              >
                Toggle to {theme === "light" ? "Dark" : "Light"} Mode
              </button>
            </div>
          )}
        </div>

        {/* Other Settings Section */}
        <div className="border-b pb-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={handleOtherSettingsToggle}
          >
            <h2 className="text-lg font-semibold text-gray-800">
              Other Settings
            </h2>
            {isOtherSettingsOpen ? (
              <IoIosArrowUp className="text-gray-600" />
            ) : (
              <IoIosArrowDown className="text-gray-600" />
            )}
          </div>
          {isOtherSettingsOpen && (
            <div className="space-y-4">
              <button className="w-full px-6 py-2 text-white bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg hover:from-gray-400 hover:to-gray-500 transition-all">
                Privacy Settings
              </button>
              <button className="w-full px-6 py-2 text-white bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg hover:from-gray-400 hover:to-gray-500 transition-all">
                Notifications
              </button>
            </div>
          )}
        </div>

        {/* Account Section */}
        <div className="border-b pb-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={handleAccountToggle}
          >
            <h2 className="text-lg font-semibold text-gray-800">
              Account Settings
            </h2>
            {isAccountOpen ? (
              <IoIosArrowUp className="text-gray-600" />
            ) : (
              <IoIosArrowDown className="text-gray-600" />
            )}
          </div>
          {isAccountOpen && (
            <div className="space-y-4">
              <button
                className="w-full px-6 py-2 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
              <button
                className="w-full px-6 py-2 text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;

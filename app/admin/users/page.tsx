"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  cardStyle,
  titleStyle,
  tableHeaderStyle,
  tableRowStyle,
} from "../styles/commonstyles";
import Image from "next/image";
import Loader from "@/components/Loader";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile_picture: string;
  is_active: boolean;
  role: string;
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users`
      );
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
      return [];
    }
  };

  const toggleUserStatus = async (userId: number, isActive: boolean) => {
    setLoadingUserId(userId);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}`,
        { is_active: !isActive }
      );
      fetchUsers(); // Refresh the user list after updating
    } catch (error) {
      console.log("Error updating user status:", error);
    } finally {
      setLoadingUserId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <div className={cardStyle}>
        <h2 className={titleStyle}>User Management</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className={tableHeaderStyle}>Profile Picture</th>
              <th className={tableHeaderStyle}>Name</th>
              <th className={tableHeaderStyle}>Email</th>
              <th className={tableHeaderStyle}>Phone</th>
              <th className={tableHeaderStyle}>Role</th>
              <th className={tableHeaderStyle}>Active</th>
              <th className={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={tableRowStyle}>
                <td>
                  <div className="flex items-center space-x-6">
                    {user.profile_picture ? (
                      <Image
                        src={user.profile_picture}
                        alt="Profile"
                        className="w-12 h-12 rounded-2xl border border-gray-200"
                        width={96}
                        height={96}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center bg-gray-300 text-white text-2xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{user.is_active.toString()}</td>
                <td>
                  <button
                    disabled={loadingUserId === user.id}
                    className={`px-4 py-2 rounded ${
                      user.is_active
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                    onClick={() => toggleUserStatus(user.id, user.is_active)}
                  >
                    {loadingUserId === user.id ? (
                      <Loader key={user.id} />
                    ) : user.is_active ? (
                      "Deactivate"
                    ) : (
                      "Activate"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;

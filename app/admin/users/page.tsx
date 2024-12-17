"use client";

import React from "react";
import {
  cardStyle,
  titleStyle,
  tableHeaderStyle,
  tableRowStyle,
} from "../styles/commonstyles";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const UserManagement: React.FC = () => {
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Editor",
    },
  ];

  return (
    <div className="p-6">
      <div className={cardStyle}>
        <h2 className={titleStyle}>User Management</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className={tableHeaderStyle}>Name</th>
              <th className={tableHeaderStyle}>Email</th>
              <th className={tableHeaderStyle}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={tableRowStyle}>
                <td className="py-2">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;

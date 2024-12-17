// UserDashboard.tsx

import { FC } from "react";
import Link from "next/link";

const UserDashboard: FC = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-blue-600 text-white p-4">
        <h2 className="text-xl font-bold mb-4">User Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link href="/user/profile">My Profile</Link>
            </li>
            <li>
              <Link href="/user/posts">My Posts</Link>
            </li>
            <li>
              <Link href="/user/messages">Messages</Link>
            </li>
            <li>
              <Link href="/user/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold">Welcome to Your Dashboard</h1>
        {/* Add user-specific content here */}
      </main>
    </div>
  );
};

export default UserDashboard;

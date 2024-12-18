"use client";

import { useAnnouncements } from "@/context/AnnouncementsContext";
import { useBlogs } from "@/context/BlogsContext";
import { useEvents } from "@/context/EventContext";
import { useInsights } from "@/context/InsightsContext";
import React, { useState } from "react";
import { Announcement } from "@/context/AnnouncementsContext";
import { Event } from "@/context/EventContext";
import { Insight } from "@/context/InsightsContext";
import { BlogPost } from "@/context/BlogsContext";

interface Item {
  id: string;
  title: string;
  category: "blogs" | "announcements" | "events" | "insights";
}

const AdminPage = () => {
  const { events, deleteEvent } = useEvents();
  const { announcements, deleteAnnouncement } = useAnnouncements();
  const { blogPosts, deleteBlog } = useBlogs();
  const { insights, deleteInsight } = useInsights();

  const [filter, setFilter] = useState<
    "all" | "blogs" | "announcements" | "events" | "insights"
  >("all");

  // Combine all items into a single list with proper title mapping
  const allItems: Item[] = [
    ...blogPosts.map((item: BlogPost) => ({
      id: item.id,
      title: item.title,
      category: "blogs" as Item["category"],
    })),
    ...announcements.map((item: Announcement) => ({
      id: item.id,
      title: item.title,
      category: "announcements" as Item["category"],
    })),
    ...events.map((item: Event) => ({
      id: item.id,
      title: item.event_name,
      category: "events" as Item["category"],
    })),
    ...insights.map((item: Insight) => ({
      id: item.id,
      title: item.insight_title,
      category: "insights" as Item["category"],
    })),
  ];

  // Filter items based on the selected filter
  const filteredItems = allItems.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (
    <div className="max-w-7xl mx-auto p-1">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-start">
        Posts
      </h1>

      {/* Responsive Filter UI */}
      <div className="mb-6">
        {/* Dropdown for Small Screens */}
        <div className="block sm:hidden mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="w-full p-2 border rounded-lg bg-gray-100"
          >
            {["all", "blogs", "announcements", "events", "insights"].map(
              (category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              )
            )}
          </select>
        </div>

        {/* Buttons for Larger Screens */}
        <div className="hidden sm:flex justify-center space-x-4">
          {["all", "blogs", "announcements", "events", "insights"].map(
            (category) => (
              <button
                key={category}
                onClick={() => setFilter(category as typeof filter)}
                className={`px-4 py-2 rounded ${
                  filter === category
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left font-semibold">Title</th>
              <th className="py-2 px-4 text-left font-semibold">Category</th>
              <th className="py-2 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4 capitalize">{item.category}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => {
                        if (item.category === "blogs") {
                          deleteBlog(item.id);
                        } else if (item.category === "announcements") {
                          deleteAnnouncement(item.id);
                        } else if (item.category === "events") {
                          deleteEvent(item.id);
                        } else if (item.category === "insights") {
                          deleteInsight(item.id);
                        }
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  No items available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;

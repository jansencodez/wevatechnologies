"use client";

import { FC } from "react";
import AnnouncementCard from "@/components/blogs/AnnouncementCard";
import { useAnnouncements } from "@/context/AnnouncementsContext";

const Announcements: FC = () => {
  const { announcements, loading, error } = useAnnouncements();

  if (loading) {
    return (
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-blue-700">Announcements</h2>
        <p className="text-lg text-gray-700">Loading announcements...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-blue-700">Announcements</h2>
        <p className="text-lg  text-red-500">{`Error: ${error}`}</p>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <h2 className="text-4xl font-bold text-blue-700">Announcements</h2>
      <p className="text-lg text-gray-700">
        Stay updated on the latest company announcements from Weva Tech.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </section>
  );
};

export default Announcements;

"use client";

import { usePathname } from "next/navigation";
import { useAnnouncements } from "@/context/AnnouncementsContext";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Dynamic content loader while the announcement is loading
const ContentLoader = dynamic(() => import("react-content-loader"), {
  ssr: false,
});

interface AnnouncementPost {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  //created_at: string;
  images: string[]; // Array of image URLs for the announcement
  link: string;
}

const Announcement = () => {
  const pathname = usePathname();
  const postSlug = pathname.split("/").pop(); // Get the slug from the URL
  const { announcements, loading, error } = useAnnouncements();
  const [announcement, setAnnouncement] = useState<AnnouncementPost | null>(
    null
  );

  // Find the matching announcement based on the slug
  useEffect(() => {
    if (!postSlug || announcements.length === 0) return;

    const matchedAnnouncement = announcements.find(
      (announcement) =>
        announcement.title.toLowerCase().replace(/\s+/g, "-") === postSlug
    );

    setAnnouncement(matchedAnnouncement || null);
  }, [postSlug, announcements]);

  if (loading) {
    return (
      <div className="container mx-auto py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ContentLoader
            speed={2}
            width={600}
            height={300}
            viewBox="0 0 600 300"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="10" rx="5" ry="5" width="400" height="40" />
            <rect x="0" y="70" rx="5" ry="5" width="600" height="20" />
            <rect x="0" y="100" rx="5" ry="5" width="580" height="20" />
            <rect x="0" y="130" rx="5" ry="5" width="550" height="20" />
            <rect x="0" y="160" rx="5" ry="5" width="580" height="20" />
          </ContentLoader>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-red-500 text-lg">
          Error loading announcements: {error}
        </p>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-gray-500 text-lg">Announcement not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header with announcement title and publication date */}
        <header className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-t-lg">
          <h1 className="text-4xl font-extrabold text-white text-center">
            {announcement.title}
          </h1>
          {/* <p className="text-sm text-gray-200 text-center mt-2">
            Published on:{" "}
            {new Date(announcement.created_at).toLocaleDateString()}
          </p> */}
        </header>

        {/* Content area */}
        <article className="p-6 space-y-6">
          <div
            className="mt-6"
            dangerouslySetInnerHTML={{ __html: announcement.content }}
          ></div>

          {/* Display images associated with the announcement in a carousel */}
          {announcement.images.length > 0 && (
            <div className="mt-6">
              <Carousel showThumbs={false} infiniteLoop>
                {announcement.images.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image}
                      alt={`Image ${index + 1} for ${announcement.title}`}
                      width={1200}
                      height={800}
                      className="w-full max-w-3xl mx-auto h-auto rounded-lg"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}

          {/* Tags and other information */}
          <div className="mt-6">
            {announcement.tags && announcement.tags.length > 0 && (
              <div className="text-sm text-gray-600">
                <strong>Tags:</strong>
                <ul className="flex space-x-2">
                  {announcement.tags.map((tag, index) => (
                    <li
                      key={index}
                      className="bg-gray-200 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default Announcement;

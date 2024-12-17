"use client";

import { FC } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

interface AnnouncementCardProps {
  announcement: {
    id: string;
    title: string;
    content: string;
    announcement_date: string;
    tags: string[];
    images: string[];
    link: string;
  };
}

const AnnouncementCard: FC<AnnouncementCardProps> = ({ announcement }) => {
  return (
    <article className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Carousel for images */}
      <Carousel
        showThumbs={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
        interval={3000}
        dynamicHeight
        className="rounded-t-lg"
      >
        {announcement.images.map((image, index) => (
          <div key={index}>
            <Image
              src={image}
              alt={`Image for ${announcement.title}`}
              width={800}
              height={400}
              className="w-full h-56 object-cover"
            />
          </div>
        ))}
      </Carousel>

      {/* Announcement Title */}
      <h3 className="text-2xl font-semibold text-gray-800 mt-4 px-6">
        {announcement.title}
      </h3>

      {/* Announcement Content */}
      <p className="text-gray-600 mt-2 px-6">{announcement.content}</p>

      {/* Announcement Date */}
      <p className="text-sm text-gray-500 mt-2 px-6">
        {format(new Date(announcement.announcement_date), "MMMM dd, yyyy")}
      </p>

      {/* Tags */}
      {announcement.tags.length > 0 && (
        <div className="mt-4 px-6">
          <strong className="text-sm text-gray-600">Tags:</strong>
          <ul className="flex space-x-2 mt-1">
            {announcement.tags.map((tag, index) => (
              <li
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-800"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Read More Link */}
      <Link
        href={`/blogs${announcement.link.toLowerCase().replace(/\s+/g, "-")}`}
        className="text-blue-700 mt-4 px-6 inline-block hover:underline"
      >
        Read more
      </Link>
    </article>
  );
};

export default AnnouncementCard;

"use client";

// components/EventCard.tsx
import { FC } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  location: string;
  link: string;
  images: string[];
}

const EventCard: FC<EventCardProps> = ({
  title,
  description,
  date,
  location,
  link,
  images,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Event Images Carousel */}
      <div className="relative w-full h-48">
        {images.length > 0 ? (
          <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={3000}
            showStatus={false}
          >
            {images.map((image, index) => (
              <div key={index} className="relative w-full h-48">
                <Image
                  src={image}
                  alt={`${title} image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Images Available</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold text-blue-600">{title}</h2>

        {/* Date */}
        <p className="text-gray-600 text-sm">
          {new Date(date).toLocaleDateString()}
        </p>

        {/* Description */}
        <p className="text-gray-800 mt-2 line-clamp-3">{description}</p>

        {/* Location */}
        <p className="text-gray-600 text-sm mt-1">{location}</p>

        {/* Read More Link */}
        <Link href={`/blogs${link}`} passHref>
          <span className="text-blue-500 hover:text-blue-700 mt-4 inline-block cursor-pointer">
            Read More
          </span>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;

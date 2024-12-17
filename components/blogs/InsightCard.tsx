"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles

interface InsightCardProps {
  insight_title: string;
  insight_content: string;
  insight_date: string;
  insight_author: string;
  images: string[];
  insight_link: string;
}

const InsightCard: FC<InsightCardProps> = ({
  insight_title,
  insight_content,
  insight_date,
  insight_author,
  images,
  insight_link,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Insight Images Carousel */}
      <div className="relative w-full h-48">
        {images.length > 0 ? (
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={3000}
            dynamicHeight={false}
            className="rounded-t-lg"
          >
            {images.map((image, index) => (
              <div key={index} className="relative w-full h-48">
                <Image
                  src={image}
                  alt={`${insight_title} - ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold text-blue-600">{insight_title}</h2>

        {/* Content Preview */}
        <p className="text-gray-800 mt-2 line-clamp-3">{insight_content}</p>

        {/* Metadata */}
        <div className="text-sm text-gray-500 mt-2">
          <p>By {insight_author}</p>
          <p>{new Date(insight_date).toLocaleDateString()}</p>
        </div>

        {/* Read More Link */}
        <Link href={`/blogs/insights/${insight_link}`} passHref>
          <span className="text-blue-500 hover:text-blue-700 mt-4 inline-block cursor-pointer">
            Read More
          </span>
        </Link>
      </div>
    </div>
  );
};

export default InsightCard;

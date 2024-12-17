"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import ContentLoader to disable SSR for it
const ContentLoader = dynamic(() => import("react-content-loader"), {
  ssr: false,
});

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

// Define your skeleton loader (can be any custom shape)
const SkeletonCard: React.FC = () => (
  <ContentLoader viewBox="0 0 400 160" height={160} width={400} speed={2}>
    <rect x="0" y="0" rx="4" ry="4" width="100%" height="60" />{" "}
    {/* Card Header */}
    <rect x="0" y="70" rx="4" ry="4" width="100%" height="15" />{" "}
    {/* Description line 1 */}
    <rect x="0" y="90" rx="4" ry="4" width="100%" height="15" />{" "}
    {/* Description line 2 */}
    <rect x="0" y="110" rx="4" ry="4" width="100%" height="15" />{" "}
    {/* Description line 3 */}
  </ContentLoader>
);

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageUrl,
  link,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl service-card">
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-white opacity-5 pointer-events-none"></div>
          <hr className="h-1 bg-gray-200 mb-3" />
          <Image
            width={300}
            height={300}
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover rounded-md mb-4"
            placeholder="blur"
            blurDataURL="https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/w_300,h_300/sample.jpg" // Path to a low-res placeholder
          />
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">{title}</h3>
          <hr className="h-1 bg-gray-200 mb-3" />
          <p className="text-gray-600 mb-5 leading-relaxed">
            {truncateText(description, 100)}
          </p>

          <Link href={link} passHref legacyBehavior>
            <a className="inline-block py-2 px-6 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-200 ease-in-out">
              Learn More
            </a>
          </Link>
        </>
      )}
    </div>
  );
};

export default ServiceCard;

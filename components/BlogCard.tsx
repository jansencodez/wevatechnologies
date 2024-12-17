"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles
import { format } from "date-fns";

// TypeScript interface for a Blog Post with multiple images
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  description: string;
  category?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  images: string[]; // Array of image URLs for the blog post
  slug: string;
  status: "draft" | "published" | "archived";
  companyName?: string;
  link: string;
}

// Dynamically import ContentLoader for the skeleton loader
const ContentLoader = dynamic(() => import("react-content-loader"), {
  ssr: false, // Disable server-side rendering to prevent hydration errors
});

// SkeletonLoader component for reuse
const SkeletonLoader: React.FC = () => (
  <ContentLoader
    viewBox="0 0 400 160"
    height={160}
    width={400}
    speed={2}
    className="mb-4"
  >
    <rect x="0" y="0" rx="4" ry="4" width="100%" height="20" /> {/* Title */}
    <rect x="0" y="30" rx="4" ry="4" width="80%" height="15" />{" "}
    {/* Description */}
    <rect x="0" y="55" rx="4" ry="4" width="60%" height="15" /> {/* Date */}
    <rect x="0" y="80" rx="4" ry="4" width="40%" height="12" />{" "}
    {/* Read More */}
  </ContentLoader>
);

// BlogCard component
const BlogCard: React.FC<{ blogPost: BlogPost; isLoading: boolean }> = ({
  blogPost,
  isLoading,
}) => {
  if (isLoading || !blogPost) {
    return (
      <div className="p-6 bg-white shadow rounded-lg border border-gray-200 mb-6">
        <SkeletonLoader />
      </div>
    );
  }

  const { title, description, created_at, link, images, tags } = blogPost;

  return (
    <article className="bg-white shadow-md rounded-lg p-6">
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
        {images?.map((imageUrl, index) => (
          <div key={index}>
            <Image
              src={imageUrl}
              alt={`Blog Image ${index + 1}`}
              width={400}
              height={200}
              className="w-full h-40 object-cover rounded-t-lg"
            />
          </div>
        ))}
      </Carousel>

      {/* Blog Post Title */}
      <h3 className="text-xl font-semibold text-gray-800 mt-4">{title}</h3>

      {/* Blog Post Description */}
      <p className="text-gray-600 mt-2">{description}</p>

      {/* Blog Post Date */}
      <p className="text-sm text-gray-500 mt-2">
        {created_at &&
          !isNaN(Date.parse(created_at)) &&
          format(new Date(created_at), "MMMM dd, yyyy")}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mt-4">
          <div className="text-sm text-gray-600">
            <strong>Tags:</strong>
            <ul className="flex space-x-2">
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-800"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Read More Link */}
      <Link
        href={link}
        className="text-blue-700 mt-4 inline-block hover:underline"
      >
        Read more
      </Link>
    </article>
  );
};

export default BlogCard;

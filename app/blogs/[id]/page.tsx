"use client";

import { usePathname } from "next/navigation";
import { useBlogs } from "@/context/BlogsContext";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Dynamic content loader while the blog post is loading
const ContentLoader = dynamic(() => import("react-content-loader"), {
  ssr: false,
});

interface BlogPost {
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

const BlogPost = () => {
  const pathname = usePathname();
  const postSlug = pathname.split("/").pop(); // Get the slug from the URL
  const { blogPosts, isLoading, error } = useBlogs();
  const [post, setPost] = useState<BlogPost | null>(null);

  // Find the matching post based on the slug
  useEffect(() => {
    if (!postSlug || blogPosts.length === 0) return;

    const matchedPost = blogPosts.find((blog) => blog.slug === postSlug);

    setPost(matchedPost || null);
  }, [postSlug, blogPosts]);

  if (isLoading) {
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
        <p className="text-red-500 text-lg">Error loading blogs: {error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-gray-500 text-lg">Post not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header with blog title, category, and publication date */}
        <header className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-t-lg">
          <h1 className="text-4xl font-extrabold text-white text-center">
            {post.title}
          </h1>
          <p className="text-sm text-gray-200 text-center mt-2">
            Published on: {new Date(post.created_at).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-200 text-center mt-2">
            Category: {post.category || "Uncategorized"}
          </p>
        </header>

        {/* Content area */}
        <article className="p-6 space-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            {post.description}
          </p>
          <div
            className="mt-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          {/* Display images associated with the post in a carousel */}
          {post.images.length > 0 && (
            <div className="mt-6">
              <Carousel showThumbs={false} infiniteLoop>
                {post.images.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image}
                      alt={`Image ${index + 1} for ${post.title}`}
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
            {post.tags && post.tags.length > 0 && (
              <div className="text-sm text-gray-600">
                <strong>Tags:</strong>
                <ul className="flex space-x-2">
                  {post.tags.map((tag, index) => (
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

          {/* Additional information */}
          {post.companyName && (
            <div className="mt-4 text-sm text-gray-600">
              <strong>Company:</strong> {post.companyName}
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default BlogPost;

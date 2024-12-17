"use client";

import BlogCard from "@/components/BlogCard"; // Assuming BlogCard component is already created
import { useBlogs } from "@/context/BlogsContext";
import Loader from "@/components/Loader";

export default function Blog() {
  const { blogPosts, isLoading, error } = useBlogs();

  if (error) {
    return (
      <div className="flex min-h-screen ">
        <p className="text-red-600 text-lg">Error loading blogs: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Title Section */}
          <div className="text-left mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">
              Recent Posts
            </h2>
            <p className="text-gray-600 mt-4">
              Explore our latest articles, insights, and stories.
            </p>
          </div>

          {/* Content Section */}
          {isLoading ? (
            <Loader />
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <BlogCard isLoading={isLoading} key={index} blogPost={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600">
                No blog posts available at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

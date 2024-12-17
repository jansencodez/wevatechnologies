"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the BlogPost type
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

// Define the context shape
interface BlogsContextType {
  blogPosts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  fetchBlogs: () => Promise<void>;
  addBlog: (blog: BlogPost) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
}

// Create the BlogsContext with a default value
const BlogsContext = createContext<BlogsContextType | undefined>(undefined);

// Define the base URL for your API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Create a provider to wrap around the app
export const BlogsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch blogs from the API
  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/blogs`);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data: BlogPost[] = await response.json();
      setBlogPosts(data);
      console.log(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to add a new blog post
  const addBlog = async (newBlog: BlogPost) => {
    try {
      const response = await fetch(`${BASE_URL}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error("Failed to add blog");
      }

      const createdBlog: BlogPost = await response.json();
      setBlogPosts((prevPosts) => [...prevPosts, createdBlog]);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  // Function to delete a blog post
  const deleteBlog = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/blogs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  // Fetch blogs when the component is mounted
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogsContext.Provider
      value={{ addBlog, blogPosts, isLoading, error, fetchBlogs, deleteBlog }}
    >
      {children}
    </BlogsContext.Provider>
  );
};

// Custom hook to use the BlogsContext
export const useBlogs = (): BlogsContextType => {
  const context = useContext(BlogsContext);
  if (!context) {
    throw new Error("useBlogs must be used within a BlogsProvider");
  }
  return context;
};

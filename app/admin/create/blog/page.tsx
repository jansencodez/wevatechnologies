"use client";

import React, { useState } from "react";
import { useBlogs } from "@/context/BlogsContext"; // Import your Blogs context
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image"; // Import next/image for image optimization

const CreateBlog = () => {
  const { addBlog } = useBlogs(); // Access addBlog function from the context
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "archived">(
    "draft"
  );
  const [images, setImages] = useState<ImageListType>([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleImageChange = (imageList: ImageListType) => {
    // Optionally, you can still validate file size here
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    const filteredImages = imageList.filter((image) => {
      if (image.file) {
        if (image.file.size > maxFileSize) {
          alert("File size exceeds 10MB.");
          return false;
        }

        const fileType = image.file.type;
        if (!fileType.startsWith("image/")) {
          alert("Only image files are allowed.");
          return false;
        }
      }
      return true;
    });

    setImages(filteredImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    // Convert tags into an array
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0); // Filter out empty tags

    // Validate status
    const validStatuses = ["draft", "published", "archived"];
    if (!validStatuses.includes(status)) {
      alert("Invalid status value");
      setLoading(false);
      return;
    }

    // Ensure at least one image is uploaded
    if (images.length === 0) {
      alert("Please upload at least one image.");
      setLoading(false);
      return;
    }

    // Prepare data for submission
    try {
      const slug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("category", category);
      tagsArray.forEach((tag) => formData.append("tags", tag)); // Add tags
      formData.append("status", status);
      formData.append("slug", slug);
      formData.append("link", `/blogs/${slug}`);

      // Add images to the FormData
      images.forEach((image) => {
        if (image.file) {
          formData.append("files", image.file); // Ensure 'file' exists
        }
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create blog post");
      }

      const data = await response.json();
      alert("Blog created successfully!");
      addBlog(data); // Add the blog to the context
      setLoading(false); // Set loading to false after successful submission

      // Clear form after successful submission
      setTitle("");
      setDescription("");
      setContent("");
      setCategory("");
      setTags("");
      setImages([]);
      setStatus("draft");
    } catch (error) {
      console.log("Error creating blog:", error);
      alert("An error occurred while creating the blog.");
      setLoading(false); // Set loading to false after error
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4 max-w-xl bg-white shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-medium">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 font-medium">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-medium">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "draft" | "published" | "archived")
            }
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-700 font-medium">
            Upload Images
          </label>
          <ImageUploading
            value={images}
            onChange={handleImageChange}
            maxNumber={5} // Allow up to 5 images
            dataURLKey="data_url"
            multiple // Allow multiple images
          >
            {({ imageList, onImageUpload, onImageRemove }) => (
              <>
                <button
                  type="button"
                  onClick={onImageUpload}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Upload Images
                </button>
                {imageList.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold">Uploaded Images</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {imageList.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={image["data_url"]}
                            alt="uploaded"
                            width={150}
                            height={100}
                            className="w-full h-32 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => onImageRemove(index)}
                            className="absolute top-2 right-2 bg-white text-black rounded-full"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </ImageUploading>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Creating..." : "Create Blog Post"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;

"use client";

import { useServices } from "@/context/servicesContext";
import { useState } from "react";

const AddServicePage = () => {
  const { setService } = useServices();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState(""); // New state for the service link
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    if (!title || !description || !imageUrl || !link) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);
    try {
      setService(title.toLowerCase(), { title, description, imageUrl, link });
      // Reset form after successful submission
      setTitle("");
      setDescription("");
      setImageUrl("");
      setLink("");
    } catch (err: unknown) {
      if (err instanceof Error)
        setError("An error occurred while adding the service.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold mb-6">Add New Service</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Service Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Service Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Service Link (URL)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white p-3 rounded  ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Adding Service..." : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default AddServicePage;

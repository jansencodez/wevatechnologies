"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageUploading, { ImageListType } from "react-images-uploading";

const CreateInsight = () => {
  const [insightTitle, setInsightTitle] = useState("");
  const [insightDate, setInsightDate] = useState("");
  const [insightContent, setInsightContent] = useState("");
  const [author, setAuthor] = useState("");
  const [images, setImages] = useState<ImageListType>([]);
  const router = useRouter();

  const maxNumber = 5; // Maximum number of images allowed

  const handleImageChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const handleInsightSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const link = insightTitle
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const formData = new FormData();
    formData.append("insight_title", insightTitle);
    formData.append("insight_date", insightDate);
    formData.append("insight_content", insightContent);
    formData.append("author", author);
    formData.append("insight_link", link);

    images.forEach((image) => {
      if (image.file) {
        formData.append("files", image.file);
      }
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/insights`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        router.push("/insights"); // Navigate to insights list or confirmation page
      } else {
        console.log("Failed to create insight");
      }
    } catch (error) {
      console.log("Error creating insight:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create Insight
      </h1>
      <form onSubmit={handleInsightSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Insight Title:
          </label>
          <input
            type="text"
            value={insightTitle}
            onChange={(e) => setInsightTitle(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Insight Date:
          </label>
          <input
            type="datetime-local"
            value={insightDate}
            onChange={(e) => setInsightDate(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Content:
          </label>
          <textarea
            value={insightContent}
            onChange={(e) => setInsightContent(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Author:
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Upload Images:
          </label>
          <ImageUploading
            multiple
            value={images}
            onChange={handleImageChange}
            maxNumber={maxNumber}
            acceptType={["jpg", "jpeg", "png"]}
          >
            {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
              <div>
                <button
                  type="button"
                  onClick={onImageUpload}
                  className="mt-2 mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  {...dragProps}
                >
                  Click or Drag to Upload
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {imageList.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image.dataURL || ""}
                        alt={`Uploaded image ${index + 1}`}
                        width={100}
                        height={100}
                        className="object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => onImageRemove(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
        </div>
        <button
          type="submit"
          className="w-full p-3 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Create Insight
        </button>
      </form>
    </div>
  );
};

export default CreateInsight;

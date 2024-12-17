"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";

const CreateAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [announcementDate, setAnnouncementDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<ImageListType>([]);
  const router = useRouter();

  const handleImageChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("announcement_date", announcementDate);
    formData.append("tags", tags.join(","));
    images.forEach((image) => {
      if (image.file) {
        formData.append("files", image.file);
      }
    });
    const link = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    if (link) {
      formData.append("link", link);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/announcements`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        router.push("/announcements");
      } else {
        console.log("Failed to create announcement");
      }
    } catch (error) {
      console.log("Error creating announcement:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create Announcement
      </h1>
      <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Content:
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Announcement Date:
          </label>
          <input
            type="datetime-local"
            value={announcementDate}
            onChange={(e) => setAnnouncementDate(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Tags:
          </label>
          <input
            type="text"
            value={tags.join(",")}
            onChange={(e) => setTags(e.target.value.split(","))}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Images:
          </label>
          <ImageUploading
            multiple
            value={images}
            onChange={handleImageChange}
            maxNumber={5}
            dataURLKey="data_url"
          >
            {({ imageList, onImageUpload, onImageRemove }) => (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={onImageUpload}
                  className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Upload Images
                </button>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {imageList.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image.data_url!}
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
                        ✕
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
          Create Announcement
        </button>
      </form>
    </div>
  );
};

export default CreateAnnouncement;

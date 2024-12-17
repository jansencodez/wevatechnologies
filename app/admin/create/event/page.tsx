"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoClose } from "react-icons/io5"; // Import the 'X' icon
import ImageUploading, { ImageListType } from "react-images-uploading";

const CreateEvent = () => {
  // State management for event details
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [images, setImages] = useState<ImageListType>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Handle form submission
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const link = eventTitle
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""); // Replace spaces with hyphens and remove non-alphanumeric characters

    const formData = new FormData();
    formData.append("event_name", eventTitle);
    formData.append("event_date", eventDate);
    formData.append("event_description", eventDescription);
    formData.append("event_location", eventLocation);

    images.forEach((image) => {
      if (image.file) {
        formData.append("files", image.file); 
      }
    });

    formData.append("event_link", link);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        router.push("/events");
      } else {
        console.log("Failed to create event");
      }
    } catch (error) {
      console.log("Error creating event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Create Event</h1>
      <form onSubmit={handleEventSubmit} className="space-y-4">
        {/* Event Title */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Event Title:
          </label>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Event Date:
          </label>
          <input
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Event Description */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Event Description:
          </label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Event Location */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Event Location:
          </label>
          <input
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Images:
          </label>
          <ImageUploading
            multiple
            value={images}
            onChange={(imageList) => setImages(imageList)}
            maxNumber={10}
            dataURLKey="data_url"
            acceptType={["jpg", "jpeg", "png"]}
            maxFileSize={10 * 1024 * 1024} // 10MB
          >
            {({ imageList, onImageUpload, onImageRemove, errors }) => (
              <div>
                <button
                  type="button"
                  onClick={onImageUpload}
                  className="p-3 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  aria-label="Upload Images"
                >
                  Upload Images
                </button>
                {errors && (
                  <div className="text-red-500 mt-2">
                    {errors.maxNumber && (
                      <p>Cannot upload more than 10 images.</p>
                    )}
                    {errors.acceptType && (
                      <p>Only JPG, JPEG, and PNG files are allowed.</p>
                    )}
                    {errors.maxFileSize && (
                      <p>File size should not exceed 10MB.</p>
                    )}
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {imageList.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        width={150}
                        height={100}
                        src={image.data_url}
                        alt={`Selected image ${index + 1}`}
                        className="h-32 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => onImageRemove(index)}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-gray-200"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <IoClose size={20} color="red" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoading}
          type="submit"
          className="w-full p-3 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          {isLoading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;

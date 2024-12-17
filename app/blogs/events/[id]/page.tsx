"use client";

import { usePathname } from "next/navigation";
import { useEvents } from "@/context/EventContext"; // Importing the EventContext
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Loader from "@/components/Loader";
import { Carousel } from "react-responsive-carousel"; // For image carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { slugify } from "@/app/utils/slugify";

const EventDetailPage = () => {
  const pathname = usePathname();
  const eventSlug = pathname.split("/").pop(); // Extract the slug from the URL
  const { events, isLoading, error } = useEvents();
  const [event, setEvent] = useState<any | null>(null);

  // Find the matching event based on the slug
  useEffect(() => {
    if (!eventSlug || events.length === 0) return;

    const matchedEvent = events.find(
      (event) => slugify(event.event_name) === eventSlug
    );

    setEvent(matchedEvent || null);
  }, [eventSlug, events]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-red-500 text-lg">Error loading events: {error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-gray-500 text-lg">Event not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header with event title, location, and date */}
        <header className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-t-lg">
          <h1 className="text-4xl font-extrabold text-white text-center">
            {event.event_name}
          </h1>
          <p className="text-sm text-gray-200 text-center mt-2">
            Date: {new Date(event.event_date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-200 text-center mt-2">
            Location: {event.event_location}
          </p>
        </header>

        {/* Content area */}
        <article className="p-6 space-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            {event.event_description}
          </p>

          {/* Display images associated with the event in a carousel */}
          {event.images.length > 0 && (
            <div className="mt-6">
              <Carousel showThumbs={false} infiniteLoop>
                {event.images.map((image: string, index: number) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Event Image ${index + 1}`}
                      className="w-full max-w-3xl mx-auto h-auto rounded-lg"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}

          {/* Additional event information */}
          <div className="mt-6">
            {event.tags && event.tags.length > 0 && (
              <div className="text-sm text-gray-600">
                <strong>Tags:</strong>
                <ul className="flex space-x-2">
                  {event.tags.map((tag: string, index: number) => (
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
        </article>
      </div>
    </div>
  );
};

export default EventDetailPage;

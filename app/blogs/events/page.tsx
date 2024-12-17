"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import { useEvents } from "@/context/EventContext"; // Importing the EventContext
import Loader from "@/components/Loader";

const EventCard = dynamic(() => import("@/components/blogs/EventCard"), {
  ssr: false,
});

const EventsPage: FC = () => {
  const { events, isLoading, error } = useEvents(); // Fetching events from the context

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-700">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event.event_link}
              title={event.event_name}
              description={event.event_description}
              date={event.event_date}
              location={event.event_location}
              link={event.event_link}
              images={event.images}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;

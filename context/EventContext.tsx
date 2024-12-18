"use client";

import { createContext, useContext, useState, useEffect } from "react";

export interface Event {
  id: string;
  event_name: string;
  event_date: string;
  event_description: string;
  event_location: string;
  event_link: string;
  images: string[]; // URLs or relative paths
}

type EventsContextType = {
  events: Event[];
  deleteEvent: (id: string) => Promise<void>;
  fetchEvents: () => Promise<void>;
  isLoading: boolean;
  error: string | null; // Add error handling
};

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from the backend
  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null); // Reset error state
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
      if (!response.ok) throw new Error("Failed to fetch events");
      const data: Event[] = await response.json();
      setEvents(data);
    } catch (error) {
      setError("Error fetching events. Please try again later.");
      console.log("Error fetching events:", error);
    } finally {
      setIsLoading(false); // Always reset loading state
    }
  };

  // Remove an event by ID from both the server and local state
  const deleteEvent = async (id: string) => {
    try {
      // Send DELETE request to the server
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      // If deletion is successful, update the local state
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      setError("Error deleting the event. Please try again later.");
      console.log("Error deleting event:", error);
    }
  };

  // Load events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider
      value={{ events, isLoading, deleteEvent, fetchEvents, error }}
    >
      {children}
    </EventsContext.Provider>
  );
};

// Custom hook to use the EventsContext
export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};

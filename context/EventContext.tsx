"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Event = {
  id: string;
  event_name: string;
  event_date: string;
  event_description: string;
  event_location: string;
  event_link: string;
  images: string[]; // URLs or relative paths
};

type EventsContextType = {
  events: Event[];
  removeEvent: (id: string) => void;
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

  // Remove an event by ID
  const removeEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  // Load events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider
      value={{ events, isLoading, removeEvent, fetchEvents, error }}
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

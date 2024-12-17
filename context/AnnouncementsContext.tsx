"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the Announcement type
interface Announcement {
  id: string;
  title: string;
  content: string;
  announcement_date: string;
  tags: string[];
  images: string[];
  link: string;
}

// Define the context type
interface AnnouncementsContextType {
  announcements: Announcement[];
  addAnnouncement: (announcement: Announcement) => void;
  updateAnnouncement: (
    id: string,
    updatedAnnouncement: Partial<Announcement>
  ) => void;
  deleteAnnouncement: (id: string) => void;
  loading: boolean;
  error: string | null;
}

// Default context value
const AnnouncementsContext = createContext<
  AnnouncementsContextType | undefined
>(undefined);

// Provider component
export const AnnouncementsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch announcements from the API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/announcements`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }
        const data = await response.json();
        setAnnouncements(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  console.log(announcements);
  // Add a new announcement
  const addAnnouncement = (announcement: Announcement) => {
    setAnnouncements((prev) => [...prev, announcement]);
  };

  // Update an existing announcement
  const updateAnnouncement = (
    id: string,
    updatedAnnouncement: Partial<Announcement>
  ) => {
    setAnnouncements((prev) =>
      prev.map((announcement) =>
        announcement.id === id
          ? { ...announcement, ...updatedAnnouncement }
          : announcement
      )
    );
  };

  // Delete an announcement
  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) =>
      prev.filter((announcement) => announcement.id !== id)
    );
  };

  return (
    <AnnouncementsContext.Provider
      value={{
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        loading,
        error,
      }}
    >
      {children}
    </AnnouncementsContext.Provider>
  );
};

// Custom hook to use the Announcements context
export const useAnnouncements = () => {
  const context = useContext(AnnouncementsContext);
  if (!context) {
    throw new Error(
      "useAnnouncements must be used within an AnnouncementsProvider"
    );
  }
  return context;
};

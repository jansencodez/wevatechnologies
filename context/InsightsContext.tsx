"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Types
export interface Insight {
  id: string;
  insight_title: string;
  insight_content: string;
  insight_date: string;
  author: string;
  images: string[];
  insight_link: string;
}

interface InsightsContextType {
  insights: Insight[];
  loading: boolean;
  error: string | null;
  fetchInsights: () => Promise<void>;
  addInsight: (insightData: FormData) => Promise<void>;
  deleteInsight: (id: string) => Promise<void>;
}

interface InsightsProviderProps {
  children: ReactNode;
}

// Context
const InsightsContext = createContext<InsightsContextType | undefined>(
  undefined
);

export const InsightsProvider = ({ children }: InsightsProviderProps) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch insights
  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/insights`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch insights");
      }
      const data: Insight[] = await response.json();
      setInsights(data);
    } catch (err: unknown) {
      if (err instanceof Error)
        setError("Something went wrong, cannot load insights at the moment!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  // Add a new insight
  const addInsight = async (insightData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        body: insightData,
      });
      if (!response.ok) {
        throw new Error("Failed to add insight");
      }
      const newInsight: Insight = await response.json();
      setInsights((prev) => [...prev, newInsight]);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete an insight by ID from both the server and local state
  const deleteInsight = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      // Send DELETE request to the server
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/insights/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete insight");
      }

      // If deletion is successful, update the local state
      setInsights((prevInsights) =>
        prevInsights.filter((insight) => insight.id !== id)
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error deleting the insight. Please try again later.");
        console.log("Error deleting insight:", err);
      }
    } finally {
      setLoading(false); // Always reset loading state
    }
  };

  return (
    <InsightsContext.Provider
      value={{
        insights,
        loading,
        error,
        fetchInsights,
        addInsight,
        deleteInsight,
      }}
    >
      {children}
    </InsightsContext.Provider>
  );
};

// Custom hook for using InsightsContext
export const useInsights = (): InsightsContextType => {
  const context = useContext(InsightsContext);
  if (!context) {
    throw new Error("useInsights must be used within an InsightsProvider");
  }
  return context;
};

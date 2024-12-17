// pages/blogs/insights.tsx
"use client";

import { FC } from "react";
import InsightCard from "@/components/blogs/InsightCard";
import { useInsights } from "@/context/InsightsContext";
import Loader from "@/components/Loader";

const InsightsPage: FC = () => {
  const { insights, loading, error } = useInsights();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-700">Insights</h1>

      {loading && (
        <p className="text-center text-gray-500 mt-4">Loading insights...</p>
      )}

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {!loading && !error && insights.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No insights available at the moment.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {loading ? (
          <Loader />
        ) : (
          insights.map((insight) => (
            <InsightCard
              key={insight.insight_link}
              insight_title={insight.insight_title}
              insight_content={insight.insight_content}
              insight_date={insight.insight_date}
              insight_author={insight.author}
              images={insight.images}
              insight_link={insight.insight_link}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default InsightsPage;

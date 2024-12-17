"use client";

import { usePathname } from "next/navigation";
import { useInsights } from "@/context/InsightsContext";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Dynamic content loader while the insight post is loading
const ContentLoader = dynamic(() => import("react-content-loader"), {
  ssr: false,
});

interface Insight {
  id: string;
  insight_title: string;
  insight_content: string;
  insight_date: string;
  author: string;
  images: string[]; // Array of image URLs for the insight
  insight_link: string; // This is the unique identifier (slug) for the insight
}

const InsightPage = () => {
  const pathname = usePathname();
  const insightSlug = pathname.split("/").pop(); // Get the slug from the URL
  const { insights, loading, error } = useInsights();
  const [insight, setInsight] = useState<Insight | null>(null);

  // Find the matching insight based on the slug
  useEffect(() => {
    if (!insightSlug || insights.length === 0) return;

    const matchedInsight = insights.find(
      (insight) => insight.insight_link === insightSlug
    );

    setInsight(matchedInsight || null);
  }, [insightSlug, insights]);

  if (loading) {
    return (
      <div className="container mx-auto py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ContentLoader
            speed={2}
            width={600}
            height={300}
            viewBox="0 0 600 300"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="10" rx="5" ry="5" width="400" height="40" />
            <rect x="0" y="70" rx="5" ry="5" width="600" height="20" />
            <rect x="0" y="100" rx="5" ry="5" width="580" height="20" />
            <rect x="0" y="130" rx="5" ry="5" width="550" height="20" />
            <rect x="0" y="160" rx="5" ry="5" width="580" height="20" />
          </ContentLoader>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-red-500 text-lg">Error loading insights: {error}</p>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-gray-500 text-lg">Insight not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header with insight title, author, and publication date */}
        <header className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-t-lg">
          <h1 className="text-4xl font-extrabold text-white text-center">
            {insight.insight_title}
          </h1>
          <p className="text-sm text-gray-200 text-center mt-2">
            Published on: {new Date(insight.insight_date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-200 text-center mt-2">
            Author: {insight.author}
          </p>
        </header>

        {/* Content area */}
        <article className="p-6 space-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            {insight.insight_content}
          </p>

          {/* Display images associated with the insight in a carousel */}
          {insight.images.length > 0 && (
            <div className="mt-6">
              <Carousel showThumbs={false} infiniteLoop>
                {insight.images.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image}
                      alt={`Image ${index + 1} for ${insight.insight_title}`}
                      width={1200}
                      height={800}
                      className="w-full max-w-3xl mx-auto h-auto rounded-lg"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default InsightPage;

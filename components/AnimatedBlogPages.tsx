"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

// Create a mapping of pathnames to indices
const pageIndexMap: Record<string, number> = {
  "/blogs": 0,
  "/blogs/announcements": 1,
  "/blogs/insights": 2,
  "/blogs/events": 3,
};

const AnimatedLayout = ({
  children,
  duration = 0.7, // Customize the duration of the animation
}: {
  children: React.ReactNode;
  duration?: number; // Customize the duration of the animation
}) => {
  const pathname = usePathname();

  // Create a reference for the content element
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Determine the index of the current page
  const pageIndex = pageIndexMap[pathname] ?? 0; // Default to 0 if page not found

  const previousPageIndex = useRef<number | null>(null);

  useEffect(() => {
    // Ensure the animation is triggered only on page changes (not the initial load)
    if (previousPageIndex.current !== null) {
      const currentIndex = pageIndex;
      let yOffset = "0%";

      // Determine the animation direction based on the page index change
      if (currentIndex > previousPageIndex.current) {
        // Moving from a lower index to a higher one (slide in from bottom)
        yOffset = "100%";
      } else if (currentIndex < previousPageIndex.current) {
        // Moving from a higher index to a lower one (slide in from top)
        yOffset = "-100%";
      }

      // Trigger the animation when pathname changes
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: yOffset }, // Start from invisible and off-screen
          {
            opacity: 1,
            y: "0%", // Move to the original position
            duration, // Apply the custom duration
            ease: "power3.out", // Ease out for smoother transitions
          }
        );
      }
    }

    // Store the current page index for the next transition
    previousPageIndex.current = pageIndex;
  }, [pathname, pageIndex, duration]); // Trigger animation on pathname or pageIndex change

  return (
    <div className="page-transition overflow-hidden h-full">
      <div ref={contentRef} className="content h-full">
        {children}
      </div>
    </div>
  );
};

export default AnimatedLayout;

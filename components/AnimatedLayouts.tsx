"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

// Create a mapping of pathnames to indices
const pageIndexMap: Record<string, number> = {
  "/home": 0,
  "/services": 1,
  "/services/edtech": 2,
  "/services/agritech": 3,
  "/services/socialPlatforms": 4,
  "/services/customSoftware": 5,
  "/contact-us": 6,
  "/onboarding": 7,
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
    if (pathname.startsWith("/blogs") || pathname.startsWith("/admin")) {
      return; // Skip the animation if inside the blogs directory
    }

    if (previousPageIndex.current !== null) {
      const currentIndex = pageIndex;
      let xOffset = "0%";

      // Determine the animation direction based on the page index change
      if (currentIndex > previousPageIndex.current) {
        // Moving from a lower index to a higher one (bottom)
        xOffset = "100%";
      } else if (currentIndex < previousPageIndex.current) {
        // Moving from a higher index to a lower one (top)
        xOffset = "-100%";
      }

      // Trigger the animation when pathname changes
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: xOffset }, // Start from invisible and off-screen
          {
            opacity: 1,
            x: 0,
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
    <div className="page-transition">
      <div ref={contentRef} className="content">
        {children}
      </div>
    </div>
  );
};

export default AnimatedLayout;

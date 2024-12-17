"use client";

import { useEffect } from "react";
import { useServices } from "@/context/servicesContext";
import ServiceCard from "./serviceCard";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";

const ServicesList = () => {
  const { services } = useServices();

  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      easing: "ease-out-cubic", // Smooth easing
      offset: 100, // Trigger animations 100px before the element comes into view
      once: false, // Replay animations on re-entry into the viewport
    });
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-2 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Iterate over all services and apply AOS animations */}
          {Object.keys(services).map((serviceName, index) => {
            const service = services[serviceName];
            return (
              <div
                key={serviceName}
                data-aos="fade-up"
                data-aos-delay={index * 100} // Stagger animations
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  imageUrl={service.imageUrl}
                  link={service.link}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;

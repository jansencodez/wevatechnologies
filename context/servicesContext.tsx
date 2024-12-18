"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Service {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface ServicesContextType {
  services: Record<string, Service>;
  setService: (serviceName: string, service: Service) => void;
  getService: (serviceName: string) => Service | undefined;
}

const ServicesContext = createContext<ServicesContextType | undefined>(
  undefined
);

interface ServicesProviderProps {
  children: ReactNode;
}

export const ServicesProvider: React.FC<ServicesProviderProps> = ({
  children,
}) => {
  const [services, setServices] = useState<Record<string, Service>>({
    agritech: {
      title: "AgriTech",
      description:
        "Empower your farming operations with cutting-edge digital solutions. From smart irrigation systems to real-time crop monitoring and predictive analytics, our AgriTech services are designed to optimize efficiency and maximize yield, ensuring a sustainable future for agriculture.",
      imageUrl: "/images/agritech.jpg",
      link: "/services/agritech", // Example link
    },
    edtech: {
      title: "EdTech",
      description:
        "Revolutionize the learning experience with our innovative EdTech solutions. We provide tools for interactive learning, AI-driven personalized education, and seamless virtual classrooms, enabling lifelong learning and improved accessibility for all.",
      imageUrl: "/images/edtech.jpg",
      link: "/services/edtech", // Example link
    },
    socialPlatforms: {
      title: "Social Platforms",
      description:
        "Foster meaningful connections with our tailored social platform solutions. From community-centric features to cutting-edge communication tools, we create dynamic digital spaces for collaboration and networking in today's interconnected world.",
      imageUrl: "/images/social-platforms.jpg",
      link: "/services/socialPlatforms", // Example link
    },
    customSoftware: {
      title: "Custom Software",
      description:
        "Transform your business with custom-built software solutions designed specifically for your needs. Whether you need enterprise-grade systems, intuitive mobile apps, or advanced data analytics tools, we turn your vision into reality.",
      imageUrl: "/images/custom-software.jpg",
      link: "/services/customSoftware",
    },
  });

  const setService = (serviceName: string, service: Service) => {
    setServices((prev) => ({
      ...prev,
      [serviceName]: service,
    }));
  };

  const getService = (serviceName: string) => {
    return services[serviceName];
  };

  return (
    <ServicesContext.Provider value={{ services, setService, getService }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): ServicesContextType => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
};

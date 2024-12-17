"use client";

import { useServices } from "@/context/servicesContext";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

const ServicePage = () => {
  const router = useRouter();
  const { service } = useParams();
  const { services } = useServices();

  // If the service is not available in the `services` object, return a 404-like page.
  if (!service || !services[service as string]) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Service Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, the service you are looking for does not exist.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg text-base font-medium transition hover:bg-blue-700"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  // Access the specific service data based on the URL
  const currentService = services[service as string];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero relative  text-white text-center py-24 px-4">
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">{currentService.title}</h1>
          <p className="text-lg font-light">Learn more about our service</p>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            {/* Service Image */}
            {currentService.imageUrl ? (
              <Image
                width={400}
                height={400}
                src={currentService.imageUrl}
                alt={currentService.title}
                className="rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full max-w-sm h-64 bg-gray-200 rounded-lg shadow-lg"></div> // Fallback if no imageUrl is provided
            )}

            {/* Service Description */}
            <div className="flex-1 text-gray-700">
              <h2 className="text-3xl font-semibold mb-4">
                About This Service
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                {currentService.description}
              </p>
              <button
                onClick={() => router.push("/contact-us")}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg text-base font-medium transition hover:bg-gray-700"
              >
                Get In Touch with Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Learn More?</h2>
        <p className="text-lg font-light mb-8">
          Contact us today and discover how we can help.
        </p>
        <button
          onClick={() => router.push("/contact-us")}
          className="px-8 py-3 bg-white text-blue-800 rounded-lg text-base font-medium transition hover:bg-gray-100"
        >
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default ServicePage;

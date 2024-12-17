"use client";

import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();

  const handleServiceSelect = (service: string) => {
    // Redirect the user based on their service selection (e.g., to a service-specific page)
    router.push(`/services/${service}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-gray-900 text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to Weva Tech!</h1>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Let’s get started by selecting a service that best fits your needs.
        </p>
      </section>

      {/* Service Selection Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Select Your Service</h2>
          <p className="text-base text-gray-700 mb-12 max-w-xl mx-auto">
            Choose one of our key service offerings that align with your needs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card */}
            <div
              className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition cursor-pointer"
              onClick={() => handleServiceSelect("agritech")}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                AgriTech
              </h3>
              <p className="text-gray-600">
                Enhance your agricultural practices with innovative digital
                solutions.
              </p>
            </div>

            <div
              className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition cursor-pointer"
              onClick={() => handleServiceSelect("edtech")}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                EdTech
              </h3>
              <p className="text-gray-600">
                Redefining education with modern tools for lifelong learning.
              </p>
            </div>

            <div
              className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition cursor-pointer"
              onClick={() => handleServiceSelect("socialPlatforms")}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Social Platforms
              </h3>
              <p className="text-gray-600">
                Creating digital spaces for meaningful connections and
                collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            We’re Here to Support You
          </h2>
          <p className="text-base text-gray-700 mb-12 max-w-2xl mx-auto">
            After selecting your service, we’ll walk you through how our
            technology can solve your specific challenges and help you achieve
            your goals.
          </p>
          <button
            className="bg-gray-800 text-white px-6 py-3 rounded-full text-base font-medium transition hover:bg-gray-700"
            onClick={() => router.push("/contact-us")}
          >
            Contact Us for More Info
          </button>
        </div>
      </section>
    </div>
  );
}

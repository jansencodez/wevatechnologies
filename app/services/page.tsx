"use client";

import ServicesList from "@/components/ServiceList";
import { useRouter } from "next/navigation";

const ServicesPage = () => {
  const router = useRouter();
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          We offer a range of services to help businesses succeed in the digital
          world.
        </p>
      </section>

      {/* Services List Section */}
      <ServicesList />

      {/* Call to Action Section */}
      <section className="bg-gray-100 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Need a Custom Solution?</h2>
        <p className="text-lg mb-6">
          Get in touch with us to discuss how we can tailor our services to your
          specific needs.
        </p>
        <button
          onClick={() => router.push("/contact-us")}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default ServicesPage;

"use client";

import { useRouter } from "next/navigation";
import ServicesList from "@/components/ServiceList";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-white via-gray-100 to-gray-200  text-black text-center py-20 px-4 flex flex-col justify-center justify-items-center h-screen border-b-2 border-black relative">
        <div
          className="pattern-wavy pattern-blue-500 pattern-bg-white 
  pattern-size-6 pattern-opacity-20 absolute z-0 top-0 left-0 right-0 bottom-0"
        ></div>

        <h1 className="text-4xl font-bold mb-6">
          We Evolve, We Act, We Transform Technology
        </h1>

        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Empowering businesses with thoughtful solutions to navigate the future
          of technology.
        </p>
        <hr className="h-1 bg-black mb-3" />
        <button
          onClick={() => router.push("/signup")}
          className="bg-black text-white hover:bg-gray-700 px-6 py-3 rounded-full text-base font-medium transition w-48 self-center z-20"
        >
          Get Started
        </button>
      </section>

      {/* About Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">About Us</h2>
          <p className="text-base text-black max-w-2xl mx-auto">
            At Weva Tech, we aim to transform industries with innovative and
            sustainable technologies. We are dedicated to providing impactful
            solutions for businesses and individuals alike.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-10">Our Services</h2>
          <ServicesList />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white text-black py-12 text-center px-4 border-t-2 border-black">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Let’s Build the Future Together
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto">
            Partner with us to transform your ideas into reality with tailored
            technology solutions.
          </p>
          <button
            className="bg-black text-white hover:bg-gray-700 px-6 py-3 rounded-full text-base font-medium transition"
            onClick={() => router.push("/contact-us")}
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}

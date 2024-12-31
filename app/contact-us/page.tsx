"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify"; // For styled notifications
import "react-toastify/dist/ReactToastify.css";

// Define the type for the form data
interface FormData {
  name: string;
  email: string;
  category: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    category: "inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle change in input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your API logic
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", category: "", message: "" });
    } catch (error: unknown) {
      if (error instanceof Error)
        toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white py-16 text-center">
        <h1 className="text-5xl font-extrabold">Get in Touch</h1>
        <p className="text-xl mt-4">
          We value your input! Please reach out to us with any questions or
          concerns.
        </p>
      </section>

      {/* Contact Form & Information */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Contact Info */}
            <div className="mb-4">
              <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Contact Information
                </h2>
                <div className="flex items-center space-x-4">
                  <FaMapMarkerAlt className="text-indigo-500 text-xl" />
                  <span className="text-gray-700">
                    123 Tech St, Nairobi, Kenya
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <FaPhoneAlt className="text-indigo-500 text-xl" />
                  <span className="text-gray-700">+254 7xx xxx xxx</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FaEnvelope className="text-indigo-500 text-xl" />
                  <span className="text-gray-700">
                    wevatechnologies@gmail.com
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white shadow-xl rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Send Us a Message
                </h2>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Message Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white"
                  >
                    <option value="inquiry">Inquiry</option>
                    <option value="interested-in-service">
                      Interested in Service
                    </option>
                    <option value="feedback">Feedback</option>
                    <option value="other">other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    placeholder="Write your message here..."
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

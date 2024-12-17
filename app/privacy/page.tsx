import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        Privacy Policy
      </h1>
      <p className="text-center mb-8 text-gray-600">
        Last updated: <strong>17th December 2024</strong>
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">
          1. Introduction
        </h2>
        <p>
          At <strong>Weva Technologies</strong>, we are committed to protecting
          your privacy. This Privacy Policy explains how we collect, use, and
          safeguard your personal information when you use our Services.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">
          2. Information We Collect
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, and other account-related details.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you interact with
            our Services.
          </li>
          <li>
            <strong>Cookies and Tracking Data:</strong> Data collected via
            cookies, web beacons, and similar technologies.
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">
          3. How We Use Your Information
        </h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide, maintain, and improve our Services.</li>
          <li>
            Communicate with you, including responding to inquiries and
            providing updates.
          </li>
          <li>Analyze usage trends and improve user experience.</li>
          <li>Ensure security and prevent fraudulent activities.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">
          4. Data Sharing and Disclosure
        </h2>
        <p>
          We do not sell your personal data. However, we may share your
          information with:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Service providers who assist in operating our platform.</li>
          <li>Law enforcement agencies if required by law.</li>
          <li>
            Third parties in connection with business transfers or mergers.
          </li>
        </ul>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">
          5. Cookies and Tracking Technologies
        </h2>
        <p>
          We use cookies to track user activity and improve our Services. You
          can manage your cookie preferences in your browser settings.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">
          6. Data Security
        </h2>
        <p>
          We implement industry-standard security measures to protect your data.
          However, no method of transmission over the internet is completely
          secure.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">
          7. Your Data Rights
        </h2>
        <p>
          You have the right to access, correct, delete, or limit the use of
          your personal data. Contact us at{" "}
          <strong className="text-indigo-600">
            support@wevatechnologies.com
          </strong>{" "}
          to exercise these rights.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">
          8. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of changes by updating the &quot;Last updated&quot; date.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">
          9. Contact Us
        </h2>
        <p>
          If you have any questions about this Privacy Policy, please contact
          us:
        </p>
        <ul className="mt-4">
          <li>
            <strong>Email:</strong>{" "}
            <span className="text-indigo-600">
              support@wevatechnologies.com
            </span>
          </li>
          <li>
            <strong>Address:</strong>{" "}
            <span className="text-gray-600">
              Viewpark Towers - Nairobi, 12th floor
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

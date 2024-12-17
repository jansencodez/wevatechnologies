import React from "react";

const TermsOfService = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-6">
        Last updated: <strong>17th December 2024</strong>
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-700">
          Welcome to <strong>Weva Technologies</strong>! These Terms of Service
          (&quot;Terms&quot;) govern your use of our website, services, and
          products (&quot;Services&quot;). By accessing or using our Services,
          you agree to be bound by these Terms. If you do not agree to these
          Terms, please do not use our Services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Definitions</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <strong>&quot;We,&quot; &quot;Us,&quot; or &quot;Our&quot;:</strong>{" "}
            Refers to <strong>Weva Technologies</strong>.
          </li>
          <li>
            <strong>
              &quot;User,&quot; &quot;You,&quot; or &quot;Your&quot;:
            </strong>{" "}
            Refers to individuals or entities accessing or using our Services.
          </li>
          <li>
            <strong>&quot;Services&quot;:</strong> Refers to all products,
            services, and platforms provided by{" "}
            <strong>Weva Technologies</strong>.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. Eligibility</h2>
        <p className="text-gray-700">
          To use our Services, you must be at least 18 years old, or the legal
          age of majority in your jurisdiction. By using our Services, you
          represent and warrant that you meet this eligibility requirement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. User Accounts</h2>
        <p className="text-gray-700">
          When you create an account with us, you agree to:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Provide accurate, complete, and up-to-date information.</li>
          <li>Keep your account credentials secure and confidential.</li>
          <li>
            Notify us immediately of any unauthorized use of your account.
          </li>
        </ul>
        <p className="text-gray-700 mt-2">
          We reserve the right to suspend or terminate your account if you
          provide false information or violate these Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Acceptable Use</h2>
        <p className="text-gray-700">You agree not to:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Use our Services for any unlawful purposes.</li>
          <li>Engage in activities that disrupt or harm our Services.</li>
          <li>
            Attempt to gain unauthorized access to our systems or networks.
          </li>
          <li>Upload or share malicious or harmful content.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          6. Intellectual Property
        </h2>
        <p className="text-gray-700">
          All content, trademarks, logos, and intellectual property on our
          Services are the property of <strong>Weva Technologies</strong> or its
          licensors. You may not copy, modify, distribute, or reproduce any part
          of our Services without prior written consent.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">7. Termination</h2>
        <p className="text-gray-700">
          We may terminate or suspend access to our Services at any time,
          without notice, if you violate these Terms. Upon termination, your
          right to use our Services will cease immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          8. Limitation of Liability
        </h2>
        <p className="text-gray-700">
          To the maximum extent permitted by law,{" "}
          <strong>Weva Technologies</strong> will not be liable for any
          indirect, incidental, or consequential damages arising from your use
          of our Services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          9. Changes to These Terms
        </h2>
        <p className="text-gray-700">
          We may update these Terms from time to time. You will be notified of
          any significant changes. Your continued use of our Services
          constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">10. Governing Law</h2>
        <p className="text-gray-700">
          These Terms are governed by the laws of <strong>Kenya</strong>. Any
          disputes arising from these Terms will be resolved in the courts of{" "}
          <strong>Kenya</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">11. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about these Terms, please contact us:
        </p>
        <p className="text-gray-700 mt-2">
          <strong>Email:</strong> support@wevatechnologies.com <br />
          <strong>Address:</strong> Viewpark Towers - Nairobi, 12th floor
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;

import { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import AnimatedLayout from "@/components/AnimatedLayouts";
import Footer from "@/components/Footer";

// Contexts
import { BlogsProvider } from "@/context/BlogsContext";
import { ServicesProvider } from "@/context/servicesContext";
import { EventsProvider } from "@/context/EventContext";
import { InsightsProvider } from "@/context/InsightsContext";
import { AnnouncementsProvider } from "@/context/AnnouncementsContext";

// Define the metadata with the correct types for SEO optimization
export const metadata: Metadata = {
  title: "Weva Technologies",
  description: "Innovative solutions in AgriTech, EdTech, and more.",
  keywords:
    "Wevatechnologies, Weva Tech, Weva, Weva Technologies, AgriTech, EdTech, Weva Tech, technology solutions, innovation, agriculture, education",
  openGraph: {
    type: "website",
    title: "Weva Technologies",
    description: "Innovative solutions in AgriTech, EdTech, and more.",
    url: "https://wevatechnologies.vercel.app",
    siteName: "Weva Technologies",
    locale: "en_KE",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Weva Tech Logo",
      },
    ],
  },
  robots: "index, follow", // Default robots setting for most pages
  viewport: "width=device-width, initial-scale=1.0",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Weva Technologies</title>
        <link rel="canonical" href="https://wevatechnologies.vercel.app" />

        {/* No need to manually add meta tags, metadata will be applied automatically */}
      </head>
      <body>
        {/* Header */}
        <header className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-900 shadow-md sticky top-0 z-50 border-b-2 border-gray-400">
          <NavBar />
        </header>

        {/* Main Content with Animated Layout */}
        <div className="flex flex-col min-h-screen">
          {/* min page content */}
          <main className="container mx-auto py-0 bg-gray-100 text-gray-800 flex-grow">
            <AnimatedLayout>{children}</AnimatedLayout>{" "}
            {/* Wrap children with AnimatedLayout */}
          </main>
          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
};

const ContexedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ServicesProvider>
      <BlogsProvider>
        <EventsProvider>
          <InsightsProvider>
            <AnnouncementsProvider>
              <RootLayout>{children}</RootLayout>
            </AnnouncementsProvider>
          </InsightsProvider>
        </EventsProvider>
      </BlogsProvider>
    </ServicesProvider>
  );
};

export default ContexedLayout;

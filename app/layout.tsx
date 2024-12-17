import type { Metadata } from "next";

import "./globals.css";
import NavBar from "@/components/NavBar";

import AnimatedLayout from "@/components/AnimatedLayouts"; // Import the AnimatedLayout
import Footer from "@/components/Footer";

//contexts
import { BlogsProvider } from "@/context/BlogsContext";
import { ServicesProvider } from "@/context/servicesContext";
import { EventsProvider } from "@/context/EventContext";
import { InsightsProvider } from "@/context/InsightsContext";
import { AnnouncementsProvider } from "@/context/AnnouncementsContext";

export const metadata: Metadata = {
  title: "Weva Tech",
  description: "Innovative solutions in AgriTech, EdTech, and more.",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
}

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

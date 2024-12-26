"use client";

import { FC, useState, useEffect, useRef } from "react";
import {
  FaUsers,
  FaProjectDiagram,
  FaClipboardList,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaServer,
  FaMailBulk,
  FaPlusCircle,
  FaBook,
} from "react-icons/fa"; // Updated Icons
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { useAuthStore } from "../store/auth";

const data = [
  {
    id: "1",
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: <FaChartLine />,
  },
  {
    id: "2",
    name: "User Management",
    link: "/admin/users",
    icon: <FaUsers />,
  },
  {
    id: "3",
    name: "Project Management",
    link: "/admin/projects",
    icon: <FaProjectDiagram />,
  },
  {
    id: "4",
    name: "System Monitoring",
    link: "/admin/system",
    icon: <FaServer />,
  },
  {
    id: "5",
    name: "API Usage",
    link: "/admin/api",
    icon: <FaClipboardList />,
  },
  {
    id: "6",
    name: "Settings",
    link: "/admin/settings",
    icon: <FaCog />,
  },
  {
    id: "7",
    name: "Messages",
    link: "/admin/messages",
    icon: <FaMailBulk />,
  },
  {
    id: "8",
    name: "Posts",
    link: "/admin/posts",
    icon: <FaBook />,
  },
  {
    id: "9",
    name: "Create",
    link: "/admin/create",
    icon: <FaPlusCircle />,
    dropdown: [
      { name: "Blog", link: "/admin/create/blog" },
      { name: "Insight", link: "/admin/create/insight" },
      { name: "Announcement", link: "/admin/create/announcement" },
      { name: "Event", link: "/admin/create/event" },
    ],
  },
];

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state for mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [loading, setLoading] = useState<boolean>(false);
  const { setAdmin, admin, clearAuth } = useAuthStore();

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = sessionStorage.getItem("token");
      const refreshToken = sessionStorage.getItem("refresh_token");

      // Redirect to login if no token is found
      if (!token) {
        router.push("/admin");
        return;
      }

      try {
        // Fetch admin details from the /protected backend endpoint
        let response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/protected`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // If the token is invalid or expired, try to refresh it
        if (!response.ok && response.status === 401 && refreshToken) {
          // Try refreshing the token
          const refreshResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/refresh`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${refreshToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            const newToken = refreshData.access_token;

            // Update the session storage with the new access token
            sessionStorage.setItem("token", newToken);

            // Retry fetching admin details with the new token
            response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/admin/protected`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
              }
            );
          } else {
            throw new Error("Unable to refresh token");
          }
        }

        if (!response.ok) {
          throw new Error("Unauthorized or token invalid");
        }

        const adminData = await response.json();

        // Role-based access control
        if (adminData.role !== "admin" && adminData.role !== "superadmin") {
          router.push("/");
          return;
        }

        // Set the admin state with fetched data
        setAdmin({
          name: adminData.name,
          email: adminData.email,
          phone: adminData.phone,
          role: adminData.role,
        });
      } catch (error) {
        console.log("Error fetching admin details:", error);
        router.push("/admin"); // Redirect to login on error
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, [router, pathname, setAdmin]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          item.name.toLowerCase().includes(debouncedTerm.toLowerCase())
        )
      );
    }
  }, [debouncedTerm]);

  const dropdownRef = useRef<HTMLDivElement>(null); // Reference for the dropdown menu

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("admin");
    clearAuth();
    router.push("/admin");
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to determine the greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Notification logic
  useEffect(() => {
    const setupWebSocket = () => {
      const socket = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS_URL}/notifications`
      );

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onmessage = (event) => {
        console.log("WebSocket message received:", event.data);
        const newMessage = JSON.parse(event.data);
        showNotification("New Message", {
          body: newMessage.message,
          icon: "/images/logo.png",
        });
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      socket.onerror = (error) => {
        console.log("WebSocket error:", error);
      };
    };

    setupWebSocket();
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else if (permission === "denied") {
          console.log("Notification permission denied.");
        } else {
          console.log("Notification permission dismissed.");
        }
      });
    } else {
      console.log("This browser does not support notifications.");
    }
  };

  const showNotification = (title: string, options: NotificationOptions) => {
    if (Notification.permission === "granted") {
      const notification = new Notification(title, options);
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    } else {
      console.log("Notification permission not granted.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (pathname === "/admin") {
    return <>{children}</>; // Render only the page content
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } md:w-64 bg-white text-black p-4 transition-all duration-300 ease-in-out border-r-2 border-gray-200`}
      >
        <div className="flex items-center justify-between">
          {/* Sidebar Title */}
          <h2
            className={`${
              isSidebarOpen ? "text-xl" : "text-sm"
            } font-bold mb-6 text-center transition-all duration-300`}
          >
            <span className="md:hidden">{isSidebarOpen && "Weva Tech"}</span>
            <span className="hidden md:inline md:text-2xl">Weva Tech</span>
          </h2>
          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden text-black items-center justify-center flex hover:bg-gray-200 p-2 rounded-md"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav>
          <ul>
            <li className="mb-4">
              <Link href="/admin/dashboard">
                <p className="flex items-center gap-3 text-lg hover:bg-gray-200 p-2 rounded-md">
                  <FaChartLine />
                  <span
                    className={`${isSidebarOpen ? "block" : "hidden"} md:block`}
                  >
                    Dashboard
                  </span>
                </p>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/users">
                <p className="flex items-center gap-3 text-lg hover:bg-gray-200 p-2 rounded-md">
                  <FaUsers />
                  <span
                    className={`${isSidebarOpen ? "block" : "hidden"} md:block`}
                  >
                    User Management
                  </span>
                </p>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/projects">
                <p className="flex items-center gap-3 text-lg hover:bg-gray-200 p-2 rounded-md">
                  <FaProjectDiagram />
                  <span
                    className={`${isSidebarOpen ? "block" : "hidden"} md:block`}
                  >
                    Project Management
                  </span>
                </p>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/system">
                <p className="flex items-center gap-3 text-lg hover:bg-gray-200 p-2 rounded-md">
                  <FaServer />
                  <span
                    className={`${isSidebarOpen ? "block" : "hidden"} md:block`}
                  >
                    System Monitoring
                  </span>
                </p>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/api">
                <p className="flex items-center gap-3 text-lg hover:bg-gray-200 p-2 rounded-md">
                  <FaClipboardList />
                  <span
                    className={`${isSidebarOpen ? "block" : "hidden"} md:block`}
                  >
                    API Usage
                  </span>
                </p>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/settings">
                <p className="flex items-center gap-3 text-lg hover:bg-gray-200 p-2 rounded-md">
                  <FaCog />
                  <span
                    className={`${isSidebarOpen ? "block" : "hidden"} md:block`}
                  >
                    Settings
                  </span>
                </p>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/messages">
                <p className="flex items-center gap-3 text-lg hover:bg-gray-200 p-2 rounded-md">
                  <FaMailBulk />
                  <span
                    className={`${isSidebarOpen ? "block" : "hidden"} md:block`}
                  >
                    Messages
                  </span>
                </p>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/posts">
                <p className="flex items-center gap-3 text-lg hover:bg-gray-200 p-2 rounded-md">
                  <FaBook />
                  <span
                    className={`${isSidebarOpen ? "block" : "hidden"} md:block`}
                  >
                    Posts
                  </span>
                </p>
              </Link>
            </li>

            {/* Dropdown Menu for Create */}
            <li className="mb-4 relative">
              <button
                className="flex items-center gap-3 text-lg hover:bg-gray-200 p-2 rounded-md"
                onClick={toggleDropdown}
              >
                <FaPlusCircle />
                <span
                  className={`${isSidebarOpen ? "block" : "hidden"} md:block`}
                >
                  Create
                </span>
              </button>

              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute left-full top-0 bg-white shadow-md p-2 rounded-md mt-2 w-48"
                >
                  <Link href="/admin/create/blog">
                    <p className="p-2 text-sm hover:bg-gray-200 rounded-md">
                      Blog
                    </p>
                  </Link>
                  <Link href="/admin/create/insight">
                    <p className="p-2 text-sm hover:bg-gray-200 rounded-md">
                      Insight
                    </p>
                  </Link>
                  <Link href="/admin/create/announcement">
                    <p className="p-2 text-sm hover:bg-gray-200 rounded-md">
                      Announcement
                    </p>
                  </Link>
                  <Link href="/admin/create/event">
                    <p className="p-2 text-sm hover:bg-gray-200 rounded-md">
                      Event
                    </p>
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-6 overflow-y-auto">
        {/* Top Navigation / Header */}
        <header className="flex items-center justify-between mb-6 border-b-2 pb-4">
          <h1 className="hidden lg:block text-3xl font-semibold">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4 w-full">
            {/* Greeting */}
            <div className="text-xl font-medium">
              {admin && admin?.name
                ? `${getGreeting()}, ${admin?.name}`
                : "Welcome back!"}
            </div>
            {/* Search Bar */}

            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                placeholder="Search..."
                className="px-2 py-2 border rounded-md focus:outline-none focus:border-blue-400 w-full"
              />
              {searchTerm && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-md mt-1 max-h-fit overflow-y-visible z-10 border">
                  {/* filtered content */}
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <div key={item.id} className="relative">
                        <Link href={item.link}>
                          <p className="p-2 text-sm hover:bg-gray-200 cursor-pointer">
                            {item.name}
                          </p>
                        </Link>

                        {/* Handle dropdown if exists and is open */}
                        {item.dropdown && (
                          <div className="absolute left-0 top-8 bg-white shadow-md p-2 rounded-md mt-2 w-48 max-w-xs border">
                            {item.dropdown.map((subItem, idx) => (
                              <Link key={idx} href={subItem.link}>
                                <p className="p-2 text-sm hover:bg-gray-200 rounded-md bg-white shadow-md w-full z-20 mt-1">
                                  {subItem.name}
                                </p>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="p-2 text-sm text-gray-500">
                      No results found
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Profile / Logout Button */}
            <button
              onClick={handleSignOut}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <FaSignOutAlt className="text-xl" />
            </button>
          </div>
        </header>

        {/* Content Area: Where Dynamic Content will be Injected */}
        <div className="space-y-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

import { useState, useEffect, useRef } from "react";
import HomeNav from "@/components/HomeNav";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react"; // Import a menu icon (you can use any icon library)

export default function HomeLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null); // Ref for the navigation sidebar

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  // Close the navigation when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeNav();
      }
    };

    // Add event listener for clicks outside the navigation
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleNav}
        className="fixed top-9 left-4 p-2 z-[90] bg-blue-500 text-white rounded-lg md:hidden"
      >
        <Menu className="w-6 h-6 " /> {/* Menu icon */}
      </button>

      {/* Fixed Sidebar Navigation */}
      <div
        ref={navRef}
        className={`fixed inset-y-0 left-0 w-[320px] bg-white z-[100] transform transition-transform duration-300 ease-in-out ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <HomeNav closeNav={closeNav} /> {/* Pass closeNav function to HomeNav */}
      </div>

      {/* Main Content */}
      <main
        className={`bg-white flex-1 ml-0 md:ml-[320px] md:p-4 min-h-screen overflow-y-auto transition-margin duration-300`}
      >
        <Outlet />
      </main>
    </div>
  );
}
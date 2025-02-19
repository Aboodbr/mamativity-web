import HomeNav from "@/components/HomeNav";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="flex">
      {/* Fixed Sidebar Navigation */}
      <HomeNav />

      {/* Main Content (Push content to the right and make it scrollable) */}
      <main className="bg-white flex-1 ml-[320px] p-4 min-h-screen overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

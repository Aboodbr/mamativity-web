import { useState } from "react";
import { cn } from "@/lib/utils";
import SearchNav from "@/components/SearchNav";
import MonthCardGrid from "@/components/MonthCardGrid";
import ChildCare from "@/components/ChildCare";

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("pregnancy");
  const [searchTerm, setSearchTerm] = useState("");

  const months = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
  ];

  const topics = [
    { id: 1, title: "Sports exercises" },
    { id: 2, title: "Vitamins and Supplements" },
    { id: 3, title: "Foods rich in folic acid" },
    { id: 4, title: "Drink plenty of water" },
    { id: 5, title: "Common problems" },
    { id: 6, title: "How to deal with it" },
    { id: 7, title: "Healthy foods" },
    { id: 8, title: "Suggested drinks" },
    { id: 9, title: "Appropriate exercises" },
    { id: 10, title: "When should you see a doctor" },
  ];

  // Filter months based on search term
  const filteredMonths = months.filter((month) =>
    month.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchNav onSearch={setSearchTerm} />

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("pregnancy")}
          className={cn(
            "px-4 py-1 md:px-6 md:py-2 rounded-full text-sm font-medium transition-colors",
            activeTab === "pregnancy"
              ? "bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none"
              : "bg-white border border-blue-200 text-gray-700 hover:bg-gray-50"
          )}
        >
          Pregnancy stage
        </button>
        <button
          onClick={() => setActiveTab("childcare")}
          className={cn(
            "px-4 py-1 md:px-6 md:py-2 rounded-full text-sm font-medium transition-colors",
            activeTab === "childcare"
              ? "bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none"
              : "bg-white border border-blue-200 text-gray-700 hover:bg-gray-50"
          )}
        >
          Child care stage
        </button>
      </div>

      {/* Formatted Title */}
      <div>
        <h1
          className="text-center font-sans text-2xl md:text-3xl font-bold mb-8"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          <span style={{ color: "#1E90FF" }}>
            Month Details | Months of Pregnancy | Vaccinations
          </span>
        </h1>
        <p className="text-center text-gray-900 mb-6 text-sm sm:text-base">
          Explore detailed insights for each pregnancy month or childcare tips.
        </p>
      </div>

      {/* Month Cards Grid */}
      {activeTab === "pregnancy" && (
        <MonthCardGrid months={filteredMonths} topics={topics} />
      )}
      {activeTab === "childcare" && <ChildCare searchTerm={searchTerm} />}
    </div>
  );
}

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import SearchNav from "@/components/SearchNav";

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
            "px-6 py-2 rounded-full text-sm font-medium transition-colors",
            activeTab === "pregnancy"
              ? "bg-gradient-to-b from-[#FFCFFA] to-[#CBF3FF] border-none"
              : "bg-white border border-blue-200 text-gray-700 hover:bg-gray-50"
          )}
        >
          Pregnancy stage
        </button>
        <button
          onClick={() => setActiveTab("childcare")}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium transition-colors",
            activeTab === "childcare"
              ? "bg-gradient-to-b from-[#FFCFFA] to-[#CBF3FF] border-none"
              : "bg-white border border-blue-200 text-gray-700 hover:bg-gray-50"
          )}
        >
          Child care stage
        </button>
      </div>

      {/* Month Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMonths.map((month) => (
          <div key={month} className="rounded-xl overflow-hidden shadow-xl">
            <Link to={`/month-${month.toLowerCase()}`}>
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="text-center font-medium text-gray-700 rounded-t-lg p-[3px] bg-gradient-to-r from-[#FFCFFA] to-[#CBF3FF]">
                  <div className="bg-white rounded-t-lg py-2 px-4">
                    {month} month
                  </div>
                </div>

                <div className="p-3 space-y-3">
                  {topics.map((topic) => (
                    <div
                      key={topic.id}
                      className="flex items-center rounded-md p-2 text-sm text-gray-600"
                    >
                      <span className="text-gray-500 mr-2">
                        Topic {topic.id}:
                      </span>
                        <span className="bg-white border border-gray-400/20 rounded-full px-1 font-semibold">
                          {topic.title}
                        </span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

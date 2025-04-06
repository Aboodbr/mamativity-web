import { cn } from "@/lib/utils";
import { useState } from "react";
import WeightAndHeight from "./WeightAndHeight";
import VaccinationScheduless from "./VaccinationScheduless";

const ChildCare = ({ searchTerm }) => {
    const [activeTab, setActiveTab] = useState("weight");
    return (
        <div>
      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("weight")}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium transition-colors",
            activeTab === "weight"
              ? "bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none"
              : "bg-white border border-blue-200 text-gray-700 hover:bg-gray-50"
          )}
        >
          Weight and height
        </button>
        <button
          onClick={() => setActiveTab("vaccination")}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium transition-colors",
            activeTab === "vaccination"
              ? "bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none"
              : "bg-white border border-blue-200 text-gray-700 hover:bg-gray-50"
          )}
        >
           (vaccination scheduless)
        </button>
      </div>

      {activeTab === "weight" && <WeightAndHeight searchTerm={searchTerm} />}
      {activeTab === "vaccination" && <VaccinationScheduless searchTerm={searchTerm} />}

        </div>
    )
}

export default ChildCare
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Plus } from "lucide-react";
import SearchNav from "@/components/SearchNav";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Article() {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const articles = [
    {
      id: "1",
      publisher: "pexels tima mi",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Draft",
      role: "contributor",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "2",
      publisher: "pexels timag",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Published",
      role: "Admin",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "3",
      publisher: "pexels tima g",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Published",
      role: "contributor",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "4",
      publisher: "pexels tima j",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Draft",
      role: "contributor",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "5",
      publisher: "pexels tima mirg",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Draft",
      role: "Admin",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "6",
      publisher: "pexels tima",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Draft",
      role: "Admin",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "7",
      publisher: "pexels tima",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Draft",
      role: "Admin",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "8",
      publisher: "pexels tima",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Draft",
      role: "contributor",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "9",
      publisher: "pexels tima m",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Published",
      role: "Admin",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "10",
      publisher: "pexels tima mi",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Draft",
      role: "contributor",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "11",
      publisher: "pexels tima",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Published",
      role: "contributor",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "12",
      publisher: "pexels tima mirodnichenko",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Draft",
      role: "Admin",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "13",
      publisher: "pexels tima jpg",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Published",
      role: "contributor",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "14",
      publisher: "pentchenko 9928529.jpg",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Draft",
      role: "Admin",
      dateCreated: "Monday, 27 Jan 2025",
    },
    {
      id: "15",
      publisher: "pexeenko 9928529.jpg",
      headline: "pexels tima mirodnichenko 9928529.jpg",
      status: "Published",
      role: "Admin",
      dateCreated: "Monday, 27 Jan 2025",
    },
  ]

  // Filter articles based on both status filter and search term
  const filteredArticles = articles.filter((article) => {
    const matchesFilter = filter === "All" || article.status === filter;
    const matchesSearch = 
      article.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <SearchNav onSearch={setSearchTerm} />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-800">Articles</h1>
        <Link to={"add-new-article"} className="bg-blue-100 flex items-center py-1 hover:bg-blue-200 text-black bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none rounded-full px-4">
          <Plus className="h-4 w-4 mr-2" />
          Add new articles
        </Link>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
      <button
    onClick={() => setFilter("All")}
    className={cn(
      "px-6 py-2 rounded-full text-sm font-medium transition-colors",
      filter === "All"
        ? "bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none"
        : "bg-white border border-blue-200 text-gray-700 hover:bg-gray-50"
    )}
  >
    All
  </button>
  <button
    onClick={() => setFilter("Published")}
    className={cn(
      "px-6 py-2 rounded-full text-sm font-medium transition-colors",
      filter === "Published"
        ? "bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none"
        : "bg-white border border-blue-200 text-gray-700 hover:bg-gray-50"
    )}
  >
    Published
  </button>
  <button
    onClick={() => setFilter("Scheduled")}
    className={cn(
      "px-6 py-2 rounded-full text-sm font-medium transition-colors",
      filter === "Scheduled"
        ? "bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none"
        : "bg-white border border-blue-200 text-gray-700 hover:bg-gray-50"
    )}
  >
    Scheduled
  </button>
  <button
    onClick={() => setFilter("Draft")}
    className={cn(
      "px-6 py-2 rounded-full text-sm font-medium transition-colors",
      filter === "Draft"
        ? "bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none"
        : "bg-white border border-blue-200 text-gray-700 hover:bg-gray-50"
    )}
  >
    Draft
  </button>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="text-left py-4 px-6 font-medium">Publisher</th>
                <th className="text-left py-4 px-6 font-medium">Article headline</th>
                <th className="text-left py-4 px-6 font-medium">Status</th>
                <th className="text-left py-4 px-6 font-medium">Role</th>
                <th className="text-left py-4 px-6 font-medium">
                  <div className="flex items-center">
                    Date created
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-medium">Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">{article.publisher}</td>
                  <td className="py-4 px-6">{article.headline}</td>
                  <td className="py-4 px-6">
                    <Badge
                      className={`px-4 py-1 font-normal w-full ${
                        article.status === "Published"
                          ? "bg-red-100 text-red-500"
                          : article.status === "Draft"
                            ? "bg-blue-100 text-blue-500"
                            : "bg-yellow-100 text-yellow-500"
                      }`}
                    >
                      {article.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">{article.role}</td>
                  <td className="py-4 px-6">{article.dateCreated}</td>
                  <td className="py-4 px-6">
                    <div className="w-6 h-0.5 bg-gray-300 rounded-full mx-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
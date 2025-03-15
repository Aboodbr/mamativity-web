import { useState } from "react";
import AddDataBox from "@/components/add-data-box";
import DataDisplay from "@/components/display-data";
import SearchNav from "@/components/SearchNav";
import { Button } from "@/components/ui/button";
import AddDataModal from "@/modals/AddDataModal";
import { Filter, Upload } from "lucide-react";
import { useParams } from "react-router-dom";

// Initial data for PDFs, Links, and Photos
const initialPdfData = [
  {
    name: "Drawing1.pdf",
    size: "91.4 KB",
    uploadDate: "11/1/2025",
    status: {
      edited: false,
      deleted: false,
      downloaded: false,
    },
  },
  {
    name: "Drawing2.pdf",
    size: "90.5 KB",
    uploadDate: "12/2/2025",
    status: {
      edited: true,
      deleted: false,
      downloaded: true,
    },
  },
];

const initialLinkData = [
  {
    name: "Eexample Link 1",
    size: "90.5 KB",
    uploadDate: "12/2/2025",
    status: {
      edited: true,
      deleted: false,
      downloaded: true,
    },
  },
  {
    name: "Eaxample Link 2",
    size: "90.5 KB",
    uploadDate: "12/2/2025",
    status: {
      edited: true,
      deleted: false,
      downloaded: true,
    },
  },
];

const initialPhotoData = [
  {
    name: "Photo 1",
    size: "90.5 KB",
    uploadDate: "12/2/2025",
    status: {
      edited: true,
      deleted: false,
      downloaded: true,
    },
  },
  {
    name: "Photo 2",
    size: "90.5 KB",
    uploadDate: "12/2/2025",
    status: {
      edited: true,
      deleted: false,
      downloaded: true,
    },
  },
];

const AdminMonthDetails = () => {
  const { month } = useParams();
  const [selectedData, setSelectedData] = useState("pdf");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State for filter box visibility
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Separate states for PDFs, Links, and Photos
  const [pdfData, setPdfData] = useState(initialPdfData);
  const [linkData, setLinkData] = useState(initialLinkData);
  const [photoData, setPhotoData] = useState(initialPhotoData);

  // Sorting state
  const [sortBy, setSortBy] = useState(null); // Can be "name", "size", or "date"

  // Function to handle adding new data
  const handleAddData = (newData) => {
    switch (selectedData) {
      case "pdf":
        setPdfData((prevData) => [...prevData, newData]);
        break;
      case "link":
        setLinkData((prevData) => [...prevData, newData]);
        break;
      case "image":
        setPhotoData((prevData) => [...prevData, newData]);
        break;
      default:
        break;
    }
    setIsModalOpen(false); // Close the modal after adding data
  };

  // Get the current data based on the selected type
  const currentData =
    selectedData === "pdf"
      ? pdfData
      : selectedData === "link"
      ? linkData
      : photoData;

  // Filter the data based on the search query
  const filteredData = currentData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort the data based on the selected criteria
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "size") {
      const sizeA = parseFloat(a.size);
      const sizeB = parseFloat(b.size);
      return sizeA - sizeB;
    } else if (sortBy === "date") {
      const dateA = new Date(a.uploadDate);
      const dateB = new Date(b.uploadDate);
      return dateA - dateB;
    } else {
      return 0; // No sorting
    }
  });

  // Clear sorting
  const clearSorting = () => {
    setSortBy(null);
  };

  // Handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <section className="container mx-auto px-4 py-8 relative">
      <SearchNav onSearch={handleSearchChange} />
      <div>
        <h1 className="text-2xl font-bold mb-6 mt-7">{month} Month</h1>

        <div>
          {/* Boxes */}
          <AddDataBox
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />
          {/* Action buttons */}
          <div className="flex justify-end gap-4 my-5 items-center">
            <div
              className="flex flex-row gap-2 items-center cursor-pointer relative"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="size-5 text-gray-600" />
              Filter By
              {/* Sort By Box */}
              {isFilterOpen && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 absolute">
                    <Button
                      onClick={() => setSortBy("name")}
                      className={`bg-none shadow-none rounded-none w-full border-b-2 border-black/10 cursor-pointer ${
                        sortBy === "name"
                          ? "bg-blue-500 text-white"
                          : ""
                      }`}
                    >
                      Sort by Name
                    </Button>
                    <Button
                      onClick={() => setSortBy("size")}
                      className={`bg-none shadow-none rounded-none w-full border-b-2 border-black/10 cursor-pointer ${
                        sortBy === "size"
                          ? "bg-blue-500 text-white"
                          : ""
                      }`}
                    >
                      Sort by Size
                    </Button>
                    <Button
                      onClick={() => setSortBy("date")}
                      className={`bg-none shadow-none rounded-none w-full border-b-2 border-black/10 cursor-pointer ${
                        sortBy === "date"
                          ? "bg-blue-500 text-white"
                          : ""
                      }`}
                    >
                      Sort by Date
                    </Button>
         
                  <div className="flex justify-end mt-4">
                    <Button
                      onClick={clearSorting}
                      className="bg-gray-200 hover:bg-gray-300"
                    >
                      Clear Sorting
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <Button className="bg-gray-200 text-md cursor-pointer rounded-full px-5 py-2 shadow-md hover:translate-0.5 duration-500">
              <Upload />
              Export
            </Button>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-200 text-md cursor-pointer rounded-full px-5 py-2 shadow-md hover:translate-0.5 duration-500"
            >
              Add a new file
            </Button>
          </div>

          {/* List of data */}
          <div
            className={`p-[3px] bg-gradient-to-r from-[#94c3fc] to-[#CBF3FF] w-full rounded-xl overflow-hidden`}
          >
            <DataDisplay data={sortedData} type={selectedData} />
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddDataModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedData={selectedData}
        onAddData={handleAddData}
      />
    </section>
  );
};

export default AdminMonthDetails;
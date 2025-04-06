import { useEffect, useState, useCallback } from "react";
import AddDataBox from "@/components/add-data-box";
import DataDisplay from "@/components/display-data";
import SearchNav from "@/components/SearchNav";
import { Button } from "@/components/ui/button";
import AddDataModal from "@/modals/AddDataModal";
import { Filter, Upload } from "lucide-react";
import { useParams } from "react-router-dom";
import { db } from "@/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

// Add this with your other initial data constants
const initialTextData = [
  {
    name: "Meeting Notes",
    content: "Discussed project timeline and deliverables for Q3. Team agreed on new milestones.",
    size: "112 chars",
    uploadDate: "10/15/2025",
    status: {
      edited: true,
      deleted: false,
      downloaded: false,
    },
  },
  {
    name: "Ideas Brainstorm",
    content: "Potential features for next release: Dark mode, Export functionality, Text notes integration",
    size: "145 chars",
    uploadDate: "11/2/2025",
    status: {
      edited: false,
      deleted: false,
      downloaded: false,
    },
  },
];

const AdminMonthDetails = () => {
  const { month } = useParams();
  const [selectedData, setSelectedData] = useState("pdf");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pdfData, setPdfData] = useState([]);
  const [linkData, setLinkData] = useState([]);
  const [photoData, setPhotoData] = useState([]);
  const [sortBy, setSortBy] = useState(null);

<<<<<<< HEAD
  // Separate states for PDFs, Links, and Photos
  const [pdfData, setPdfData] = useState(initialPdfData);
  const [linkData, setLinkData] = useState(initialLinkData);
  const [photoData, setPhotoData] = useState(initialPhotoData);
  const [textData, setTextData] = useState(initialTextData);
=======
  const extractSize = (sizeStr) =>
    parseFloat(sizeStr?.replace(/[^\d.]/g, "") || 0);
>>>>>>> 9c686f6f78e0ce48fd072bb80a04a3fc56739ab7

  const fetchData = useCallback(async () => {
    try {
      const collections = ["pdfs", "images", "links"];
      const [pdfsSnapshot, imagesSnapshot, linksSnapshot] = await Promise.all(
        collections.map((col) =>
          getDocs(collection(db, "months", month.toLowerCase(), col))
        )
      );

<<<<<<< HEAD
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
      case "text":
        setTextData((prevData) => [...prevData, {
          ...newData,
          size: `${newData.content.length} chars` // Calculate size for text
        }]);
        break;
      default:
        break;
    }
    setIsModalOpen(false);
=======
      const formatDocs = (snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPdfData(formatDocs(pdfsSnapshot));
      setPhotoData(formatDocs(imagesSnapshot));
      setLinkData(formatDocs(linksSnapshot));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [month]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddData = (newData) => {
    const updateState = (prev) => [...prev, newData];
    if (selectedData === "pdf") setPdfData(updateState);
    else if (selectedData === "link") setLinkData(updateState);
    else if (selectedData === "image") setPhotoData(updateState);
    setIsModalOpen(false);
  };

  const handleEdit = async (id, currentName) => {
    const newName = prompt("Enter new name:", currentName);
    if (newName && newName !== currentName) {
      const ref = doc(
        db,
        "months",
        month.toLowerCase(),
        `${selectedData}s`,
        id
      );
      await updateDoc(ref, { name: newName, "status.edited": true });
      fetchData();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const ref = doc(
        db,
        "months",
        month.toLowerCase(),
        `${selectedData}s`,
        id
      );
      await updateDoc(ref, { "status.deleted": true }); // Soft delete
      fetchData();
    }
  };

  const handleDownload = async (id, url) => {
    window.open(url, "_blank");
    const ref = doc(db, "months", month.toLowerCase(), `${selectedData}s`, id);
    await updateDoc(ref, { "status.downloaded": true });
    fetchData();
  };

  const handleExport = () => {
    const currentData =
      selectedData === "pdf"
        ? pdfData
        : selectedData === "link"
        ? linkData
        : photoData;
    const csv = ["Name,Size,Upload Date,URL"]
      .concat(
        currentData.map(
          (item) => `${item.name},${item.size},${item.uploadDate},${item.url}`
        )
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${month}_${selectedData}s.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
>>>>>>> 9c686f6f78e0ce48fd072bb80a04a3fc56739ab7
  };

  const currentData =
    selectedData === "pdf"
      ? pdfData
      : selectedData === "link"
      ? linkData
<<<<<<< HEAD
      : selectedData === "image"
      ? photoData
      : textData;

  // Filter the data based on the search query
=======
      : photoData;
>>>>>>> 9c686f6f78e0ce48fd072bb80a04a3fc56739ab7
  const filteredData = currentData.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "size") return extractSize(a.size) - extractSize(b.size);
    if (sortBy === "date")
      return new Date(a.uploadDate) - new Date(b.uploadDate);
    return 0;
  });

  return (
    <section className="container mx-auto px-4 py-8 relative">
      <SearchNav onSearch={setSearchQuery} />
      <h1 className="text-2xl font-bold mb-6 mt-7 capitalize">{month} Month</h1>

      <AddDataBox
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <div className="flex justify-end gap-4 my-5 items-center">
        <div
          className="relative flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="size-5 text-gray-600" /> Filter By
          {isFilterOpen && (
            <div className="absolute top-8 right-0 bg-white p-6 rounded-lg shadow-md z-10">
              <Button
                onClick={() => setSortBy("name")}
                className={`w-full ${
                  sortBy === "name" ? "bg-blue-500 text-white" : ""
                }`}
              >
                Sort by Name
              </Button>
              <Button
                onClick={() => setSortBy("size")}
                className={`w-full ${
                  sortBy === "size" ? "bg-blue-500 text-white" : ""
                }`}
              >
                Sort by Size
              </Button>
              <Button
                onClick={() => setSortBy("date")}
                className={`w-full ${
                  sortBy === "date" ? "bg-blue-500 text-white" : ""
                }`}
              >
                Sort by Date
              </Button>
              <Button
                onClick={() => setSortBy(null)}
                className="mt-4 bg-gray-200 hover:bg-gray-300"
              >
                Clear Sorting
              </Button>
            </div>
          )}
        </div>

        <Button
          onClick={handleExport}
          className="bg-gray-200 rounded-full px-5 py-2 shadow-md"
        >
          <Upload /> Export
        </Button>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-200 rounded-full px-5 py-2 shadow-md"
        >
          Add a new file
        </Button>
      </div>

      <div className="p-[3px] bg-gradient-to-r from-[#94c3fc] to-[#CBF3FF] w-full rounded-xl overflow-hidden">
        {sortedData.length > 0 ? (
          <DataDisplay
            data={sortedData}
            type={selectedData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />
        ) : (
          <p className="p-4 text-center text-gray-500">
            No {selectedData}s found for {month}.
          </p>
        )}
      </div>

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

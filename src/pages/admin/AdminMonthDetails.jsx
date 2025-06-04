import { useEffect, useState, useCallback } from "react";
import AddDataBox from "@/components/add-data-box";
import DataDisplay from "@/components/display-data";
import SearchNav from "@/components/SearchNav";
import { Button } from "@/components/ui/button";
import AddDataModal from "@/modals/AddDataModal";
import { Filter, Upload } from "lucide-react";
import { useParams } from "react-router-dom";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const AdminMonthDetails = () => {
  const { month } = useParams();
  const [selectedData, setSelectedData] = useState("pdf");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [loading, setLoading] = useState(false);

  const [pdfData, setPdfData] = useState([]);
  const [linkData, setLinkData] = useState([]);
  const [photoData, setPhotoData] = useState([]);
  const [textData, setTextData] = useState([]);

  const extractSize = (sizeStr) =>
    parseFloat(sizeStr?.replace(/[^\d.]/g, "") || 0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const collections = ["pdf", "image", "link", "text"];
      const collectionSources = [
        { name: "months", displayName: "Month Details" },
        { name: "Months of Pregnancy", displayName: "Months of Pregnancy" },
      ];

      const allData = { pdf: [], image: [], link: [], text: [] };

      for (const source of collectionSources) {
        for (const col of collections) {
          const colRef = collection(db, source.name, month.toLowerCase(), col);
          const snapshot = await getDocs(colRef);
          const fieldName =
            col === "image"
              ? "image"
              : col === "text"
              ? "text"
              : col === "link"
              ? "url"
              : "file";

          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            allData[col].push({
              id: doc.id,
              name: doc.id,
              [fieldName]: data[fieldName],
              size: data.size,
              uploadDate: data.uploadDate,
              content: data[fieldName],
              collectionType: source.displayName,
            });
          });
        }
      }

      setPdfData(allData.pdf);
      setPhotoData(allData.image);
      setLinkData(allData.link);
      setTextData(allData.text);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [month]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddData = (newData) => {
    const fieldName =
      selectedData === "image"
        ? "image"
        : selectedData === "text"
        ? "text"
        : selectedData === "link"
        ? "url"
        : "file";

    const newItem = {
      id: newData.id,
      name: newData.id,
      [fieldName]: newData[fieldName],
      size: newData.size,
      uploadDate: newData.uploadDate,
      content: newData[fieldName],
      collectionType: newData.collectionType || "Month Details",
    };

    switch (selectedData) {
      case "pdf":
        setPdfData((prev) => [...prev, newItem]);
        break;
      case "link":
        setLinkData((prev) => [...prev, newItem]);
        break;
      case "image":
        setPhotoData((prev) => [...prev, newItem]);
        break;
      case "text":
        setTextData((prev) => [...prev, newItem]);
        break;
      default:
        break;
    }
    setIsModalOpen(false);
    fetchData();
  };

  const handleEdit = async (id, currentName, collectionType) => {
    const newName = prompt("Enter new name:", currentName);
    if (newName && newName !== currentName) {
      const collectionName =
        collectionType === "Month Details" ? "months" : "Months of Pregnancy";
      const newDocRef = doc(
        db,
        collectionName,
        month.toLowerCase(),
        selectedData,
        newName.toLowerCase()
      );
      const docSnap = await getDoc(newDocRef);

      if (docSnap.exists()) {
        alert(
          `A document with the name "${newName}" already exists in ${collectionType}. Please choose a different name.`
        );
        return;
      }

      const oldDocRef = doc(
        db,
        collectionName,
        month.toLowerCase(),
        selectedData,
        id
      );
      const oldDocSnap = await getDoc(oldDocRef);
      const oldData = oldDocSnap.data();

      await setDoc(newDocRef, {
        ...oldData,
        status: { ...oldData.status, edited: true },
      });

      await deleteDoc(oldDocRef);
      fetchData();
    }
  };

  const handleDelete = async (id, collectionType) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const collectionName =
        collectionType === "Month Details" ? "months" : "Months of Pregnancy";
      const ref = doc(
        db,
        collectionName,
        month.toLowerCase(),
        selectedData,
        id
      );
      try {
        await deleteDoc(ref);
        fetchData();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleDownload = async (id, content) => {
    if (selectedData !== "text" && content) {
      window.open(content, "_blank");
      const collectionName =
        currentData.find((item) => item.id === id)?.collectionType ===
        "Month Details"
          ? "months"
          : "Months of Pregnancy";
      const ref = doc(
        db,
        collectionName,
        month.toLowerCase(),
        selectedData,
        id
      );
      await updateDoc(ref, { "status.downloaded": true });
      fetchData();
    }
  };

  const handleExport = () => {
    const currentData =
      selectedData === "pdf"
        ? pdfData
        : selectedData === "link"
        ? linkData
        : selectedData === "image"
        ? photoData
        : textData;

    const fieldName =
      selectedData === "image"
        ? "image"
        : selectedData === "text"
        ? "text"
        : selectedData === "link"
        ? "url"
        : "file";

    const csv = ["Name,Collection,Size,Upload Date,Content"]
      .concat(
        currentData.map(
          (item) =>
            `${item.name},${item.collectionType},${item.size},${
              item.uploadDate
            },${item[fieldName] || item.content || ""}`
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
  };

  const currentData =
    selectedData === "pdf"
      ? pdfData
      : selectedData === "link"
      ? linkData
      : selectedData === "image"
      ? photoData
      : textData;

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
          className="relative flex flex-row gap-1 md:gap-2 items-center cursor-pointer"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="size-5 text-gray-600" />{" "}
          <span className="hidden sm:flex">Filter By</span>
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

      <div className="p-[3px] bg-gradient-to-r from-[#94c3fc] to-[#CBF3FF] w-full rounded-xl overflow-x-auto">
        {loading ? (
          <p className="p-4 text-center text-gray-500">Loading...</p>
        ) : sortedData.length > 0 ? (
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

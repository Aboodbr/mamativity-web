import { Filter, Upload } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import VaccinationTable from "./vaccination-table";
import AddFileModal from "../modals/AddFileModal";
import WeightTable from "./weight-table";

const WeightAndHeight = ({ searchTerm }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState([
    {
      id: "1",
      pdfName: "Hepatitis B",
      vaccinationDate: "1\\11\\2025",
      age: "After birth (within 24 hours)",
      isDeleted: false,
      isEdited: true,
    },
  ]);

  const filterRef = useRef(null);

  const filteredRecords = records.filter(
    (record) =>
      record.pdfName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.age.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === "name") return a.pdfName.localeCompare(b.pdfName);
    if (sortBy === "date")
      return a.vaccinationDate.localeCompare(b.vaccinationDate);
    if (sortBy === "size") return a.age.localeCompare(b.age);
    return 0;
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearSorting = () => {
    setSortBy(null);
    setIsFilterOpen(false);
  };

  const handleAddFile = (newFile) => {
    const newRecord = {
      id: (records.length + 1).toString(),
      pdfName: newFile.pdfName,
      vaccinationDate: newFile.vaccinationDate,
      age: newFile.age,
      isDeleted: false,
      isEdited: false,
    };
    setRecords([...records, newRecord]);
  };

  const handleDelete = (id) => {
    setRecords(
      records.map((record) =>
        record.id === id ? { ...record, isDeleted: true } : record
      )
    );
  };

  const handleEdit = (id) => {
    setRecords(
      records.map((record) =>
        record.id === id ? { ...record, isEdited: true } : record
      )
    );
  };

  const handleSort = (type) => {
    setSortBy(type);
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 my-5 items-start lg:items-center">
        <h1 className="text-xl md:text-2xl font-semibold">Weight And Height</h1>

        <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto">
          {/* Filter Button Group */}
          <div ref={filterRef} className="flex gap-2 w-full lg:w-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-gray-200 rounded-full px-4 py-2 w-full justify-center"
            >
              <Filter className="size-5 text-gray-600" />
              <span>Filter By</span>
            </button>

            {isFilterOpen && (
              <div className="bg-white p-4 rounded-lg shadow-md absolute top-12 right-0 w-48 z-10 space-y-2">
                <button
                  onClick={() => handleSort("name")}
                  className={`w-full text-left p-2 ${
                    sortBy === "name"
                      ? "bg-blue-500 text-white rounded-md"
                      : "hover:bg-gray-100 rounded-md"
                  }`}
                >
                  Sort by Name
                </button>
                <button
                  onClick={() => handleSort("date")}
                  className={`w-full text-left p-2 ${
                    sortBy === "date"
                      ? "bg-blue-500 text-white rounded-md"
                      : "hover:bg-gray-100 rounded-md"
                  }`}
                >
                  Sort by Date
                </button>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={clearSorting}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons Group */}
          <div className="flex gap-2 w-full lg:w-auto">
            <button className="bg-gray-200 text-sm md:text-md flex gap-2 items-center justify-center cursor-pointer rounded-full px-4 py-2 w-full shadow-md hover:translate-y-0.5 duration-200">
              <Upload className="size-4 md:size-5" />
              <span>Export</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-200 text-sm md:text-md flex items-center justify-center cursor-pointer rounded-full px-4 py-2 w-full shadow-md hover:translate-y-0.5 duration-200"
            >
              Add file
            </button>
          </div>
        </div>
      </div>

      {/* Table Component */}
      <WeightTable
        records={sortBy ? sortedRecords : filteredRecords}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* Modal Component */}
      <AddFileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddFile={handleAddFile}
      />
    </div>
  );
};

export default WeightAndHeight;
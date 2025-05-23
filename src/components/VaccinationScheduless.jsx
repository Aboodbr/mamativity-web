import { Filter, Upload, Trash2 } from "lucide-react"; // إضافة أيقونة Trash2
import { useState, useEffect, useRef, useCallback } from "react";
import VaccinationTable from "./vaccination-table";
import AddFileModal from "../modals/AddFileModal";
import { db } from "@/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; // استبدال updateDoc بـ deleteDoc

const VaccinationScheduless = ({ searchTerm }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState([]);

  const filterRef = useRef(null);

  // جلب البيانات من Firestore
  const fetchRecords = useCallback(async () => {
    try {
      const recordsSnapshot = await getDocs(collection(db, "Vaccinations"));
      const recordsData = recordsSnapshot.docs.map((doc) => ({
        id: doc.id,
        vaccineName: doc.id,
        ...doc.data(),
        isEdited: doc.data().isEdited || false,
      }));
      setRecords(recordsData);
      console.log("Fetched records:", recordsData);
    } catch (error) {
      console.error("Error fetching records from Firestore:", error);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // تصفية السجلات بناءً على البحث
  const filteredRecords = records.filter(
    (record) =>
      record.vaccineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.age.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ترتيب السجلات
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === "name") return a.vaccineName.localeCompare(b.vaccineName);
    if (sortBy === "date") return a.createdAt - b.createdAt;
    if (sortBy === "size") return a.doseSize.localeCompare(b.doseSize);
    return 0;
  });

  // إغلاق قائمة التصفية عند النقر خارجها
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

  // إضافة سجل جديد
  const handleAddFile = (newFile) => {
    const newRecord = {
      id: newFile.vaccineName.toLowerCase(),
      vaccineName: newFile.vaccineName,
      age: newFile.age,
      disease: newFile.disease,
      doseSize: newFile.doseSize,
      method: newFile.method,
      createdAt: newFile.createdAt,
      isEdited: false,
    };
    setRecords((prev) => [...prev, newRecord]);
    fetchRecords();
  };

  // حذف سجل فعلي من Firestore
  const handleDelete = async (id) => {
    try {
      console.log(`Attempting to delete record with ID: ${id}`);
      const recordRef = doc(db, "Vaccinations", id);
      await deleteDoc(recordRef); // الحذف الفعلي من Firestore
      console.log(`Record with ID: ${id} deleted from Firestore`);
      setRecords(records.filter((record) => record.id !== id)); // إزالة السجل من الحالة
      console.log("Updated records state after deletion");
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // تعديل سجل
  const handleEdit = async (id) => {
    try {
      const recordRef = doc(db, "Vaccinations", id);
      await updateDoc(recordRef, { isEdited: true });
      setRecords(
        records.map((record) =>
          record.id === id ? { ...record, isEdited: true } : record
        )
      );
    } catch (error) {
      console.error("Error editing record:", error);
    }
  };

  const handleSort = (type) => {
    setSortBy(type);
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 my-5 items-start lg:items-center">
        <h1 className="text-xl md:text-2xl font-semibold">
          Vaccination schedule
        </h1>

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
                <button
                  onClick={() => handleSort("size")}
                  className={`w-full text-left p-2 ${
                    sortBy === "size"
                      ? "bg-blue-500 text-white rounded-md"
                      : "hover:bg-gray-100 rounded-md"
                  }`}
                >
                  Sort by Dose Size
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
      <VaccinationTable
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

export default VaccinationScheduless;

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const AddFileModal = ({ isOpen, onClose, onAddFile }) => {
  const [newFile, setNewFile] = useState({
    vaccineName: "", // اسم التطعيم
    age: "", // العمر
    disease: "", // المرض
    doseSize: "", // حجم الجرعة
    method: "", // طريقة التطعيم
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setNewFile({
        vaccineName: "",
        age: "",
        disease: "",
        doseSize: "",
        method: "",
      });
      setErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!newFile.vaccineName.trim())
      newErrors.vaccineName = "Vaccine Name is required";
    if (!newFile.age.trim()) newErrors.age = "Age is required";
    if (!newFile.disease.trim()) newErrors.disease = "Disease is required";
    if (!newFile.doseSize.trim()) newErrors.doseSize = "Dose Size is required";
    if (!newFile.method.trim()) newErrors.method = "Method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        // إنشاء مستند باسم التطعيم في المجموعة Vaccinations
        const vaccineDocRef = doc(
          db,
          "Vaccinations",
          newFile.vaccineName.toLowerCase()
        );

        // إعداد البيانات للتخزين
        const vaccineData = {
          age: newFile.age,
          disease: newFile.disease,
          doseSize: newFile.doseSize,
          method: newFile.method,
          createdAt: serverTimestamp(),
        };

        // تخزين البيانات مباشرة في المستند
        await setDoc(vaccineDocRef, vaccineData, { merge: true });

        console.log(
          "Document added with name:",
          newFile.vaccineName.toLowerCase()
        );

        // تمرير البيانات إلى المكون الأب
        onAddFile({
          vaccineName: newFile.vaccineName,
          ...vaccineData,
        });

        // إغلاق الموديل
        onClose();
      } catch (error) {
        console.error("Error adding document to Firestore:", error);
        setErrors({
          submit: "Failed to add data to Firestore. Please try again.",
        });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">Add New Vaccination</h2>
          <button
            onClick={onClose} // إغلاق الموديل فقط
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {errors.submit && (
            <p className="text-red-500 text-sm">{errors.submit}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vaccine Name *
            </label>
            <input
              type="text"
              value={newFile.vaccineName}
              onChange={(e) =>
                setNewFile({ ...newFile, vaccineName: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.vaccineName
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter vaccine name"
            />
            {errors.vaccineName && (
              <p className="mt-1 text-sm text-red-500">{errors.vaccineName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age *
            </label>
            <input
              type="text"
              value={newFile.age}
              onChange={(e) => setNewFile({ ...newFile, age: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.age
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter age description (e.g., 2 months)"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-500">{errors.age}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Disease *
            </label>
            <input
              type="text"
              value={newFile.disease}
              onChange={(e) =>
                setNewFile({ ...newFile, disease: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.disease
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter disease name"
            />
            {errors.disease && (
              <p className="mt-1 text-sm text-red-500">{errors.disease}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dose Size *
            </label>
            <input
              type="text"
              value={newFile.doseSize}
              onChange={(e) =>
                setNewFile({ ...newFile, doseSize: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.doseSize
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter dose size (e.g., 0.5 mL)"
            />
            {errors.doseSize && (
              <p className="mt-1 text-sm text-red-500">{errors.doseSize}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Method *
            </label>
            <input
              type="text"
              value={newFile.method}
              onChange={(e) =>
                setNewFile({ ...newFile, method: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.method
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter method (e.g., Intramuscular)"
            />
            {errors.method && (
              <p className="mt-1 text-sm text-red-500">{errors.method}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose} // إغلاق الموديل فقط
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={
              !newFile.vaccineName ||
              !newFile.age ||
              !newFile.disease ||
              !newFile.doseSize ||
              !newFile.method
            }
          >
            Add Vaccination
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFileModal;

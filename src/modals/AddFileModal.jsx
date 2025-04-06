import { X } from "lucide-react";
import { useState, useEffect } from "react";


const AddFileModal = ({ isOpen, onClose, onAddFile }) => {
  const [newFile, setNewFile] = useState({
    pdfName: "",
    vaccinationDate: "",
    age: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setNewFile({ pdfName: "", vaccinationDate: "", age: "" });
      setErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!newFile.pdfName.trim()) newErrors.pdfName = "PDF Name is required";
    if (!newFile.vaccinationDate.trim()) newErrors.vaccinationDate = "Date is required";
    if (!newFile.age.trim()) newErrors.age = "Age is required";
    
    // Validate date format (basic validation)
    if (newFile.vaccinationDate.trim() && !/\d{1,2}\\\d{1,2}\\\d{4}/.test(newFile.vaccinationDate)) {
      newErrors.vaccinationDate = "Use format: day\\month\\year (e.g., 1\\11\\2025)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onAddFile(newFile);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">Add New File</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="size-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PDF Name *
            </label>
            <input
              type="text"
              value={newFile.pdfName}
              onChange={(e) => setNewFile({...newFile, pdfName: e.target.value})}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.pdfName ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter PDF name"
            />
            {errors.pdfName && <p className="mt-1 text-sm text-red-500">{errors.pdfName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vaccination Date * (day\month\year)
            </label>
            <input
              type="text"
              value={newFile.vaccinationDate}
              onChange={(e) => setNewFile({...newFile, vaccinationDate: e.target.value})}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.vaccinationDate ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter date (e.g., 1\\11\\2025)"
            />
            {errors.vaccinationDate && <p className="mt-1 text-sm text-red-500">{errors.vaccinationDate}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age *
            </label>
            <input
              type="text"
              value={newFile.age}
              onChange={(e) => setNewFile({...newFile, age: e.target.value})}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.age ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter age description"
            />
            {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
          </div>
        </div>
        
        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={!newFile.pdfName || !newFile.vaccinationDate || !newFile.age}
          >
            Add File
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFileModal;
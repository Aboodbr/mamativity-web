import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const AddDataModal = ({ isOpen, onClose, selectedData, onAddData }) => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  if (!isOpen) return null;

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    // If the file is an image, generate a preview
    if (selectedData === "image" && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null); // Clear preview if not an image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      name,
      size: "0 KB", // You can calculate the size later
      uploadDate: new Date().toLocaleDateString(),
      status: {
        edited: false,
        deleted: false,
        downloaded: false,
      },
    };

    if (selectedData === "pdf" || selectedData === "image") {
      newData.file = file;
    } else if (selectedData === "link") {
      newData.link = link;
    }

    onAddData(newData);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New {selectedData}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {(selectedData === "pdf" || selectedData === "image") && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Upload {selectedData}</label>
              <input
                type="file"
                accept={selectedData === "pdf" ? "application/pdf" : "image/*"}
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
                required
              />
              {/* Image preview */}
              {selectedData === "image" && imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>
          )}
          {selectedData === "link" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Link</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter link"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF]">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDataModal;
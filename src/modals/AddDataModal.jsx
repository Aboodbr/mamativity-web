import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, FileIcon, Image as ImageIcon, Link, Text } from "lucide-react";

const AddDataModal = ({ isOpen, onClose, selectedData, onAddData }) => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState(""); // For text content
  const [imagePreview, setImagePreview] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (selectedData === "image" && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      name,
      size: selectedData === "text" ? `${content.length} chars` : "0 KB",
      uploadDate: new Date().toLocaleDateString(),
      status: {
        edited: false,
        deleted: false,
        downloaded: false,
      },
      ...(selectedData === "text" && { content }), // Add content for text
    };

    if (selectedData === "pdf" || selectedData === "image") {
      newData.file = file;
    } else if (selectedData === "link") {
      newData.link = link;
    }

    onAddData(newData);
    onClose();
    // Reset form
    setFile(null);
    setLink("");
    setName("");
    setContent("");
    setImagePreview(null);
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
                required={selectedData !== "text"}
              />
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
          {selectedData === "text" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded min-h-[100px]"
                placeholder="Enter your text content"
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
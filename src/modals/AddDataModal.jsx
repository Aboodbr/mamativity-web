import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { uploadFileToCloudinary } from "@/utils/uploadToCloudinary";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useState } from "react";

const AddDataModal = ({ isOpen, onClose, selectedData, onAddData }) => {
  const { month } = useParams();
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
    return urlPattern.test(url);
  };

  const handleSubmit = async () => {
    setUploading(true);
    setError("");

    try {
      let fileUrl = "";
      let fileSize = "0 KB";

      if (selectedData === "link") {
        if (!link || !isValidUrl(link)) {
          throw new Error("Please enter a valid URL.");
        }
        fileUrl = link;
      } else if (file) {
        if (
          (selectedData === "pdf" && !file.type.includes("pdf")) ||
          (selectedData === "image" && !file.type.includes("image"))
        ) {
          throw new Error(`Please upload a valid ${selectedData} file.`);
        }
        const url = await uploadFileToCloudinary(file);
        fileUrl = url;
        fileSize = (file.size / 1024).toFixed(1) + " KB";
      } else {
        throw new Error("Please select a file or enter a link.");
      }

      const newData = {
        name: name || file?.name || "Unnamed",
        url: fileUrl,
        size: fileSize,
        uploadDate: new Date().toLocaleDateString("en-US"),
        status: {
          edited: false,
          deleted: false,
          downloaded: false,
        },
        createdAt: serverTimestamp(),
      };

      await addDoc(
        collection(db, "months", month.toLowerCase(), `${selectedData}s`),
        newData
      );

      onAddData(newData);
      resetForm();
    } catch (error) {
      setError(error.message || "Error uploading data. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setLink("");
    setName("");
    setError("");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
        <Dialog.Panel className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <X />
          </button>
          <Dialog.Title className="text-xl font-semibold mb-4">
            Add New {selectedData}
          </Dialog.Title>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
            />

            {selectedData === "link" ? (
              <input
                type="url"
                placeholder="Paste link here (e.g., https://example.com)"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full border p-2 rounded"
              />
            ) : (
              <input
                type="file"
                accept={selectedData === "image" ? "image/*" : ".pdf"}
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border p-2 rounded"
              />
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={uploading}
            className={`mt-6 w-full py-2 rounded transition ${
              uploading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {uploading ? "Uploading..." : "Add"}
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

AddDataModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedData: PropTypes.oneOf(["pdf", "link", "image"]).isRequired,
  onAddData: PropTypes.func.isRequired,
};

export default AddDataModal;

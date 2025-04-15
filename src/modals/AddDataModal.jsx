import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { uploadFileToCloudinary } from "@/utils/uploadToCloudinary";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useState } from "react";

const AddDataModal = ({ isOpen, onClose, selectedData, onAddData }) => {
  const { month } = useParams();
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const isValidUrl = (url) => {
    const urlPattern =
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
    return urlPattern.test(url);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedData === "image" && selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const resetForm = () => {
    setFile(null);
    setLink("");
    setName("");
    setContent("");
    setImagePreview(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    try {
      if (!month) {
        throw new Error("Month parameter is missing.");
      }

      if (!name.trim()) {
        throw new Error("Please enter a name for the section.");
      }

      let fileUrl = "";
      let fileSize = "";

      if (selectedData === "link") {
        if (!link || !isValidUrl(link)) {
          throw new Error("Please enter a valid URL.");
        }
        fileUrl = link;
      } else if (selectedData === "text") {
        if (!content.trim()) {
          throw new Error("Please enter some text content.");
        }
        fileUrl = content;
        fileSize = `${content.length} chars`;
      } else if (file) {
        if (
          (selectedData === "pdf" && !file.type.includes("pdf")) ||
          (selectedData === "image" && !file.type.includes("image"))
        ) {
          throw new Error(`Please upload a valid ${selectedData} file.`);
        }
        fileUrl = await uploadFileToCloudinary(file);
        fileSize = (file.size / 1024).toFixed(1) + " KB";
      } else {
        throw new Error("Please select a file or enter content.");
      }

      const newData = {
        name,
        url: fileUrl,
        size: fileSize,
        uploadDate: new Date().toLocaleDateString("en-US"),
        createdAt: serverTimestamp(),
      };

      console.log("Data to be submitted:", newData);

      // Ensure the month document exists in the months collection
      const monthDocRef = doc(db, "months", month.toLowerCase());
      await setDoc(
        monthDocRef,
        { createdAt: serverTimestamp() },
        { merge: true }
      );

      // Save to months/{month}/{selectedData} collection
      const docRef = await addDoc(
        collection(db, "months", month.toLowerCase(), selectedData),
        newData
      );

      console.log("Document added with ID:", docRef.id);

      try {
        onAddData({ ...newData, id: docRef.id });
      } catch (addDataError) {
        console.error("Error in onAddData:", addDataError);
        throw new Error("Failed to update parent component.");
      }

      resetForm();
      onClose();
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Error uploading data. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
        <Dialog.Panel className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <X />
          </button>

          <Dialog.Title className="text-xl font-semibold mb-4">
            Add New {selectedData}
          </Dialog.Title>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Section Name
              </label>
              <input
                type="text"
                placeholder="e.g. Section1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {(selectedData === "pdf" || selectedData === "image") && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Upload {selectedData === "pdf" ? "PDF" : "Image"}
                </label>
                <input
                  type="file"
                  accept={
                    selectedData === "pdf" ? "application/pdf" : "image/*"
                  }
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                  required
                />
                {selectedData === "image" && imagePreview && (
                  <div className="mt-2">
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
              <div>
                <label className="block text-sm font-medium mb-1">Link</label>
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
              <div>
                <label className="block text-sm font-medium mb-1">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border rounded min-h-[100px]"
                  placeholder="Enter your text content"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={uploading}
              className={`mt-4 w-full py-2 rounded transition ${
                uploading
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {uploading ? "Uploading..." : "Add"}
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

AddDataModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedData: PropTypes.oneOf(["pdf", "link", "image", "text"]).isRequired,
  onAddData: PropTypes.func.isRequired,
};

export default AddDataModal;

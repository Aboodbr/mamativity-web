import {
  FileIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Text as TextIcon,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Swal from "sweetalert2"; // Import SweetAlert2

const DataDisplay = ({ data, type, onDelete, onDownload }) => {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleViewClick = (id, url, itemType, content) => {
    if (itemType === "text") {
      setSelectedText(content);
      setIsTextModalOpen(true);
    } else if (itemType === "image") {
      console.log(`Image URL for ${id}:`, url);
      setSelectedImageUrl(url);
      setImageLoading(true);
      setImageError(false);
      setIsImageModalOpen(true);
    } else {
      onDownload(id, url);
    }
  };

  const handleDeleteClick = async (id, collectionType) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await onDelete(id, collectionType);
        Swal.fire("Deleted!", "The item has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      Swal.fire("Error!", "Failed to delete the item.", "error");
    }
  };

  const handleImageError = (itemName) => {
    console.log(`Failed to load preview for ${itemName}`);
    Swal.fire("Error!", `Failed to load preview for ${itemName}.`, "error");
  };

  return (
    <div className="w-full rounded-lg overflow-x-auto bg-white">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              {type.charAt(0).toUpperCase() + type.slice(1)} Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Collection
            </th>
            {type !== "text" && (
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Size
              </th>
            )}
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Upload Date
            </th>
            {type === "text" && (
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Preview
              </th>
            )}
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 flex items-center gap-2">
                {type === "pdf" && (
                  <FileIcon className="h-5 w-5 text-red-500" />
                )}
                {type === "link" && (
                  <LinkIcon className="h-5 w-5 text-red-500" />
                )}
                {type === "image" && (
                  <ImageIcon className="h-5 w-5 text-red-500" />
                )}
                {type === "text" && (
                  <TextIcon className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm text-gray-900">
                  {item.name || "Unnamed"}
                </span>
                {type === "image" && item.url && (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-10 w-10 object-cover rounded ml-3"
                    onError={() => handleImageError(item.name)}
                  />
                )}
              </td>

              <td className="px-4 py-3 text-sm text-gray-500">
                {item.collectionType || "N/A"}
              </td>

              {type !== "text" && (
                <td className="px-4 py-3 text-sm text-gray-500">
                  {item.size || "N/A"}
                </td>
              )}

              <td className="px-4 py-3 text-sm text-gray-500">
                {item.uploadDate || "N/A"}
              </td>

              {type === "text" && (
                <td className="px-4 py-3 text-sm text-gray-500">
                  {item.content?.substring(0, 30)}...
                </td>
              )}

              <td className="px-4 py-3 flex items-center gap-3">
                <button
                  onClick={() =>
                    handleViewClick(item.id, item.url, type, item.content)
                  }
                  className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  title={
                    type === "image"
                      ? "View Image"
                      : type === "text"
                      ? "View Text"
                      : "Download"
                  }
                  aria-label={
                    type === "image"
                      ? "View image"
                      : type === "text"
                      ? "View text"
                      : "Download file"
                  }
                >
                  <Eye className="h-5 w-5" />
                </button>

                <button
                  onClick={() =>
                    handleDeleteClick(item.id, item.collectionType)
                  }
                  className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                  title="Delete"
                  aria-label="Delete item"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Text Content */}
      {isTextModalOpen && (
        <Dialog
          open={isTextModalOpen}
          onClose={() => setIsTextModalOpen(false)}
          className="fixed z-50 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
            <DialogPanel className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
              <button
                onClick={() => setIsTextModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
              <DialogTitle className="text-xl font-semibold mb-4">
                Text Content
              </DialogTitle>
              <p className="text-gray-600">{selectedText}</p>
              <button
                onClick={() => setIsTextModalOpen(false)}
                className="mt-4 w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Close
              </button>
            </DialogPanel>
          </div>
        </Dialog>
      )}

      {/* Modal for Image Content */}
      {isImageModalOpen && (
        <Dialog
          open={isImageModalOpen}
          onClose={() => {
            setIsImageModalOpen(false);
            setImageLoading(false);
            setImageError(false);
          }}
          className="fixed z-50 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
            <DialogPanel className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-lg relative">
              <button
                onClick={() => {
                  setIsImageModalOpen(false);
                  setImageLoading(false);
                  setImageError(false);
                }}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                aria-label="Close image modal"
              >
                <X className="h-5 w-5" />
              </button>
              <DialogTitle className="text-xl font-semibold mb-4">
                Image Preview
              </DialogTitle>
              <div className="flex justify-center items-center min-h-[200px]">
                {imageLoading && !imageError && (
                  <p className="text-gray-500">Loading image...</p>
                )}
                {imageError && (
                  <p className="text-red-500">
                    Failed to load image. Please try again.
                  </p>
                )}
                {!imageError && (
                  <img
                    src={selectedImageUrl}
                    alt="Preview"
                    className={`w-full max-h-[70vh] object-contain rounded ${
                      imageLoading ? "hidden" : "block"
                    }`}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageLoading(false);
                      setImageError(true);
                      Swal.fire(
                        "Error!",
                        "Failed to load the image in the modal.",
                        "error"
                      );
                    }}
                  />
                )}
              </div>
              <button
                onClick={() => {
                  setIsImageModalOpen(false);
                  setImageLoading(false);
                  setImageError(false);
                }}
                className="mt-4 w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Close
              </button>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

DataDisplay.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      size: PropTypes.string,
      content: PropTypes.string,
      uploadDate: PropTypes.string,
      url: PropTypes.string,
      collectionType: PropTypes.oneOf(["Month Details", "Months of Pregnancy"]),
    })
  ).isRequired,
  type: PropTypes.oneOf(["pdf", "link", "image", "text"]).isRequired,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default DataDisplay;

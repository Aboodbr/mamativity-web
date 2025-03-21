import { FileIcon, Image, Link } from "lucide-react";
import PropTypes from "prop-types";

const DataDisplay = ({ data, type, onEdit, onDelete, onDownload }) => {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-white">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              {type.charAt(0).toUpperCase() + type.slice(1)} Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Size
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Upload Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Edit
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Delete
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Display
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
                {type === "link" && <Link className="h-5 w-5 text-red-500" />}
                {type === "image" && <Image className="h-5 w-5 text-red-500" />}
                <span className="text-sm text-gray-900">
                  {item.name || "Unnamed"}
                </span>
                {type === "image" && item.url && (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-10 w-10 object-cover rounded ml-3"
                  />
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {item.size || "N/A"}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {item.uploadDate || "N/A"}
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onEdit(item.id, item.name)}
                  disabled={item.status?.edited}
                  className={`px-3 py-1 rounded-md text-sm ${
                    item.status?.edited
                      ? "bg-pink-100 text-pink-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  {item.status?.edited ? "Edited" : "Edit"}
                </button>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onDelete(item.id)}
                  disabled={item.status?.deleted}
                  className={`px-3 py-1 rounded-md text-sm ${
                    item.status?.deleted
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  {item.status?.deleted ? "Deleted" : "Delete"}
                </button>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onDownload(item.id, item.url)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    item.status?.downloaded
                      ? "bg-gray-200 text-gray-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  {item.status?.downloaded ? "Displayed" : "Download"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataDisplay.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      size: PropTypes.string,
      uploadDate: PropTypes.string,
      url: PropTypes.string.isRequired,
      status: PropTypes.shape({
        edited: PropTypes.bool,
        deleted: PropTypes.bool,
        downloaded: PropTypes.bool,
      }),
    })
  ).isRequired,
  type: PropTypes.oneOf(["pdf", "link", "image"]).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default DataDisplay;

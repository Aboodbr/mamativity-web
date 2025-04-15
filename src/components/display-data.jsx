import {
  FileIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Text as TextIcon,
  Trash2,
  Eye,
} from "lucide-react";
import PropTypes from "prop-types";

const DataDisplay = ({ data, type, onDelete, onDownload }) => {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-white">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              {type.charAt(0).toUpperCase() + type.slice(1)} Name
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
                  />
                )}
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
                  onClick={() => onDownload(item.id, item.url)}
                  className="text-blue-600 hover:text-blue-800"
                  title={type === "image" ? "عرض" : "تحميل"}
                >
                  <Eye className="h-5 w-5" />
                </button>

                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 className="h-5 w-5" />
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
      content: PropTypes.string,
      uploadDate: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
  type: PropTypes.oneOf(["pdf", "link", "image", "text"]).isRequired,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default DataDisplay;

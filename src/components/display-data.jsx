import { FileIcon, Image, Link, Text } from "lucide-react";

const DataDisplay = ({ data, type }) => {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-white">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              {type.charAt(0).toUpperCase() + type.slice(1)} Name
            </th>
            {type !== "text" && (
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Size</th>
            )}
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Upload date</th>
            {type === "text" && (
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Preview</th>
            )}
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Edit</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Delete</th>
            {type !== "text" && (
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Download</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 flex items-center gap-2">
                {type === "pdf" && <FileIcon className="h-5 w-5 text-red-500" />}
                {type === "link" && <Link className="h-5 w-5 text-red-500" />}
                {type === "image" && <Image className="h-5 w-5 text-red-500" />}
                {type === "text" && <Text className="h-5 w-5 text-red-500" />}
                <span className="text-sm text-gray-900">{item.name}</span>
              </td>
              {type !== "text" && (
                <td className="px-4 py-3 text-sm text-gray-500">{item.size || "N/A"}</td>
              )}
              <td className="px-4 py-3 text-sm text-gray-500">{item.uploadDate || "N/A"}</td>
              {type === "text" && (
                <td className="px-4 py-3 text-sm text-gray-500">
                  {item.content?.substring(0, 30)}...
                </td>
              )}
              <td className="px-4 py-3">
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    item.status?.edited ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {item.status?.edited ? "edited" : "Edit"}
                </button>
              </td>
              <td className="px-4 py-3">
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    item.status?.deleted ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {item.status?.deleted ? "Deleted" : "Delete"}
                </button>
              </td>
              {type !== "text" && (
                <td className="px-4 py-3">
                  <button
                    className={`px-3 py-1 rounded-md text-sm ${
                      item.status?.downloaded ? "bg-gray-200 text-gray-700" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {item.status?.downloaded ? "Downloaded" : "Download"}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay;
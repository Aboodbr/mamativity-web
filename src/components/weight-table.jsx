import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WeightTable({ records, onDelete, onEdit }) {
  return (
    <div className="w-full overflow-hidden flex justify-center mt-10">
      <div className="overflow-x-auto w-full border border-blue-100 rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blue-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Age
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Weight (Kg)
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Vaccination date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Age
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Delete video
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Download
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b border-blue-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex">
                    <span className="font-medium">{record.pdfName}</span>
                  </div>
                </td>
                <td>
                  <Badge
                    variant="destructive"
                    className="w-fit mt-1 bg-red-500 hover:bg-red-600"
                  >
                    compulsory
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.vaccinationDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{record.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.isDeleted ? (
                    <span className="inline-block px-4 py-1 bg-red-100 text-red-500 rounded-md">
                      Deleted
                    </span>
                  ) : (
                    <Button
                      variant="secondary"
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                      onClick={() => onDelete(record.id)}
                    >
                      Delete
                    </Button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.isEdited ? (
                    <span className="inline-block px-4 py-1 bg-red-100 text-red-500 rounded-md">
                      edited
                    </span>
                  ) : (
                    <Button
                      variant="secondary"
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                      onClick={() => onEdit(record.id)}
                    >
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
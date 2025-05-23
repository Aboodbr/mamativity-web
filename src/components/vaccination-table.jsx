import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react"; // استيراد أيقونة الحذف

export default function VaccinationTable({ records, onDelete }) {
  return (
    <div className="w-full overflow-hidden flex justify-center mt-10">
      <div className="overflow-x-auto w-full border border-blue-100 rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blue-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Vaccine Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Age
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Disease
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Dose Size
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Method
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-blue-50 hover:bg-blue-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex">
                      <span className="font-medium">{record.vaccineName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.disease}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.doseSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onDelete(record.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      title="Delete this record"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

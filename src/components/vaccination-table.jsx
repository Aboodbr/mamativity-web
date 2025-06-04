import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function VaccinationTable({ records, onDelete }) {
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire("Deleted!", "The record has been deleted.", "success");
      }
    });
  };

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
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {record.vaccineName}
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
                      onClick={() => handleDelete(record.id)}
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

VaccinationTable.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      vaccineName: PropTypes.string,
      age: PropTypes.string,
      disease: PropTypes.string,
      doseSize: PropTypes.string,
      method: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

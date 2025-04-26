import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore"; // إضافة deleteDoc
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react"; // استيراد أيقونة الحذف
import PropTypes from "prop-types";

export function UsersList({ searchQuery }) {
  const [users, setUsers] = useState([]);

  // دالة الحذف
  const handleDelete = async (userId) => {
    try {
      console.log(`Attempting to delete user with ID: ${userId}`);
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef); // الحذف الفعلي من Firestore
      console.log(`User with ID: ${userId} deleted from Firestore`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          firstName: doc.data().firstName || "Unknown",
          lastName: doc.data().lastName || "User",
          email: doc.data().email || "No Email",
          phone: doc.data().phone || "No Phone",
          createdAt: doc.data().createdAt || null,
          country: "Egypt",
          status: doc.data().status,
        }));

        console.log("Fetched users:", usersData);
        setUsers(usersData);
      },
      (error) => {
        console.error("Error fetching users:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      (
        user.firstName.toLowerCase() +
        " " +
        user.lastName.toLowerCase()
      ).includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  return (
    <div>
      <div className="flex gap-3 flex-wrap"></div>

      <h1 className="text-2xl font-bold mb-4 mt-7">Users table</h1>

      <div className="shadow-xl rounded-xl py-5 px-10">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-400/50 font-bold tracking-wider text-black/90">
              <TableHead className="py-5">Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-gray-400/50 font-bold tracking-wider text-black/90"
                >
                  <TableCell className="py-5">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>
                    {user.createdAt && user.createdAt.seconds
                      ? new Date(
                          user.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${
                        user.status === "Active"
                          ? "bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF]"
                          : "bg-red-100 text-red-800 px-4 py-2"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      title="Delete this user"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-5">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

UsersList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

import { useState, useEffect } from "react";
import { db } from "@/firebase"; // تأكد أن `firebase.js` يحتوي على `db`
import { collection, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function UsersList({ searchQuery }) {
  const [users, setUsers] = useState([]);

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
          createdAt: doc.data().createdAt || null, // قد يكون غير موجود
          country: "Egypt", // قيمة ثابتة
          status: "Active", // قيمة ثابتة
        }));

        console.log("Fetched users:", usersData); // عرض البيانات في الكونسول
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
      <h1 className="text-2xl font-bold mb-6 mt-7">Users List</h1>

      {/* أزرار التحكم */}
      <div className="flex gap-3 flex-wrap">
        <Button className="rounded-full bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] px-5 py-5">
          Edit data
        </Button>
        <Button className="rounded-full bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] px-5 py-5">
          Account deactivation
        </Button>
        <Button className="rounded-full bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] px-5 py-5">
          Activate account
        </Button>
        <Button className="rounded-full bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] px-5 py-5">
          Send direct notifications
        </Button>
        <Button className="rounded-full bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] px-5 py-5">
          Delete account
        </Button>
      </div>

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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-5">
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
import PropTypes from "prop-types";

UsersList.propTypes = {
  searchQuery: PropTypes.string.isRequired, // تأكد من أن searchQuery هو نصي وإجباري
};

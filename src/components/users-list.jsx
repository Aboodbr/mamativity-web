import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


const users = [
  {
    name: "Manar Ali",
    type: "woman",
    phone: "01087985507",
    email: "john@microsoft.com",
    country: "Egypt",
    status: "Active",
  },
  {
    name: "Manar Ali",
    type: "woman",
    phone: "01087985507",
    email: "john@microsoft.com",
    country: "Egypt",
    status: "Active",
  },
  {
    name: "Manar Ali",
    type: "woman",
    phone: "01087985507",
    email: "john@microsoft.com",
    country: "Egypt",
    status: "Active",
  },
  {
    name: "Manar Ali",
    type: "woman",
    phone: "01087985507",
    email: "john@microsoft.com",
    country: "Egypt",
    status: "Inactive",
  },
  // Add more users here...
]

export function UsersList() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6 mt-7">Users List</h1>
      <div className="flex gap-3 flex-wrap">
        <Button variant="outline" className={"rounded-full bg-gradient-to-b from-[#FFCFFA] to-[#CBF3FF] border-none px-5 py-5"}>Edit data</Button>
        <Button variant="outline" className={"rounded-full bg-gradient-to-b from-[#FFCFFA] to-[#CBF3FF] border-none px-5 py-5"}>Account deactivation</Button>
        <Button variant="outline" className={"rounded-full bg-gradient-to-b from-[#FFCFFA] to-[#CBF3FF] border-none px-5 py-5"}>Activate account</Button>
        <Button variant="outline" className={"rounded-full bg-gradient-to-b from-[#FFCFFA] to-[#CBF3FF] border-none px-5 py-5"}>Send direct notifications</Button>
        <Button variant="outline" className={"rounded-full bg-gradient-to-b from-[#FFCFFA] to-[#CBF3FF] border-none px-5 py-5"}>Delete account</Button>
      </div>

      <h1 className="text-2xl font-bold mb-4 mt-7">Users table</h1>

      <div className="shadow-xl rounded-xl py-5 px-10">
        <Table>
          <TableHeader>
            <TableRow className={"border-gray-400/50 font-bold tracking-wider text-black/90 "}>
              <TableHead className={"py-5"}>Name</TableHead>
              <TableHead>User type</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}  className={"border-gray-400/50 font-bold tracking-wider text-black/90"}>
                <TableCell  className={"py-5"}>{user.name}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell className={"roboto font-normal"}>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${
                      user.status === "Active" ? "bg-gradient-to-b from-[#FFCFFA] to-[#CBF3FF] border-none px-5 py-2" : "bg-red-100 text-red-800  px-4 py-2"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


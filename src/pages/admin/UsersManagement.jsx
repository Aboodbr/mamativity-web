import { useState } from "react";
import SearchNav from "@/components/SearchNav";
import { UsersList } from "@/components/users-list";

const UsersManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <SearchNav onSearch={setSearchQuery} />
      <UsersList searchQuery={searchQuery} />
    </div>
  );
};

export default UsersManagement;

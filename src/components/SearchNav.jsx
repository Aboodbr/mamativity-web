import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const SearchNav = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData({
              firstName: userDoc.data().firstName || "",
              lastName: userDoc.data().lastName || "",
            });
          }
        } catch (error) {
          console.error("خطأ أثناء جلب الاسم:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="container relative mx-auto px-4 py-3">
        <div className="flex ml-9 md:ml-0 justify-center">
          <div className="relative flex-1 max-w-xl rounded-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search"
              value={query}
              onChange={handleSearchChange}
              className="pl-10 py-6 rounded-full w-full shadow-lg border-none focus:ring-2 focus:ring-gray-300 text-xl placeholder:text-xl"
            />
          </div>
          <div className="flex absolute top-6 right-5 items-center gap-4 ml-4">
            <div className="flex flex-row items-center space-x-2">
              <p className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {userData.firstName || "..."}
              </p>
              <p className="font-semibold text-lg text-gray-700">
                {userData.lastName || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SearchNav;

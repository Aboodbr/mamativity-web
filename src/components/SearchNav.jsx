import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchNav = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); // Pass search query to parent component
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="container relative mx-auto px-4 py-3">
        <div className="flex justify-center">
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
          <div className="flex absolute top-2 right-5 items-center gap-4 ml-4">
            <button className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                2
              </span>
            </button>
            <div className="flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zjfmNXgjnY9Y0b3STIS6HSx5wwsSM3.png"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="hidden sm:block">
                <p className="font-semibold">Nada</p>
                <p className="text-sm text-gray-500">gmail</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SearchNav;

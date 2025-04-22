import SearchNav from "@/components/SearchNav";
import { Link } from "react-router-dom";
import month1 from "@/assets/month1.png";
import month2 from "@/assets/month2.png";
import month3 from "@/assets/month3.png";
import month4 from "@/assets/month4.png";
import month5 from "@/assets/month5.png";
import month6 from "@/assets/month6.png";
import month7 from "@/assets/month7.png";
import month8 from "@/assets/month8.png";
import { useState } from "react";

const pregnancyMonths = [
  {
    month: "The first month",
    image: month1,
    slug: "first-month",
  },
  {
    month: "The second month",
    image: month2,
    slug: "second-month",
  },
  {
    month: "The third month",
    image: month3,
    slug: "third-month",
  },
  {
    month: "The fourth month",
    image: month4,
    slug: "fourth-month",
  },
  {
    month: "5th month",
    image: month5,
    slug: "fifth-month",
  },
  {
    month: "The sixth month",
    image: month6,
    slug: "sixth-month",
  },
  {
    month: "The seventh month",
    image: month7,
    slug: "seventh-month",
  },
  {
    month: "The eighth month",
    image: month8,
    slug: "eighth-month",
  },
  {
    month: "Ninth month",
    image: month1,
    slug: "ninth-month",
  },
];

const MonthsOfPregnancy = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMonths = pregnancyMonths.filter((month) =>
    month.month.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen">
      <SearchNav onSearch={handleSearch} />
      
      <h1 className="text-2xl md:text-3xl font-bold mb-8 px-4">
        Weekly pregnancy series
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 px-4">
        {filteredMonths.map((month, index) => (
          <Link to={`/month/${month.slug}`} key={index}>
            <div className="group relative cursor-pointer">
              <div className="relative rounded-2xl overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
                <div className="flex flex-col items-center md:mx-1 mt-5">
                  <div className="aspect-video relative rounded-xl">
                    <img
                      src={month.image || "/placeholder.svg"}
                      alt={month.month}
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <div className="bg-gradient-to-b from-[#FFCFFA] to-[#CBF3FF] rounded-2xl p-4 transition-shadow w-[95%] z-10 -mt-22">
                    <h3 className="font-bold text-xl line-clamp-2 py-3 text-center">
                      {month.month}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MonthsOfPregnancy;
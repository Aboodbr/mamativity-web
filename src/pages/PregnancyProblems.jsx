import month1 from "@/assets/month1.png";
import month2 from "@/assets/month2.png";
import month3 from "@/assets/month3.png";
import month4 from "@/assets/month4.png";
import month5 from "@/assets/month5.png";
import month6 from "@/assets/month6.png";
import month7 from "@/assets/month7.png";
import month8 from "@/assets/month8.png";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";

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

const PregnancyProblems = () => {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50">
        <div className="container relative mx-auto px-4 py-3">
          <div className="flex  justify-center">
            <div className="relative flex-1 max-w-xl rounded-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="search"
                placeholder="Search"
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

      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Weekly pregnancy series
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pregnancyMonths.map((month, index) => (
          <Link to={`/month/${month.slug}`} key={index}>
          <div  className="group relative cursor-pointer">
            {/* Card with gradient background */}
            <div className="relative h-64 rounded-2xl overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
              {/* Image container */}
              <div className="flex flex-col items-center mx-1">
                <div className="aspect-video relative  rounded-xl">
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

export default PregnancyProblems;

import { useParams } from "react-router-dom";
import pregnancyData from "../data/pregnancyData.json";

import month1 from "@/assets/month1.png";
import month2 from "@/assets/month2.png";
import month3 from "@/assets/month3.png";
import month4 from "@/assets/month4.png";
import month5 from "@/assets/month5.png";
import month6 from "@/assets/month6.png";
import month7 from "@/assets/month7.png";
import month8 from "@/assets/month8.png";

import m1e1 from "@/assets/m1e1.png";
import m1e2 from "@/assets/m1e2.png";
import m1e3 from "@/assets/m1e3.png";
import m1e4 from "@/assets/m1e4.png";
import m1e5 from "@/assets/m1e5.png";
import m1e6 from "@/assets/m1e6.png";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const MonthDetails = () => {
  const { monthId } = useParams();
  const decodedMonthId = decodeURIComponent(monthId || ""); 

  const month = pregnancyData.find((m) => m.slug === decodedMonthId);

  const m1Es = [m1e1, m1e2, m1e3, m1e4, m1e5, m1e6];

  if (!month) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500">Month not found</h2>
        <p className="text-lg mt-4">
          Please check the URL or go back to the home page.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6">
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
      <div className="relative flex flex-col justify-center items-center">
  <img
    className="w-full"
    src={
      month.image === "month1"
        ? month1
        : month.image === "month2"
        ? month2
        : month.image === "month3"
        ? month3
        : month.image === "month4"
        ? month4
        : month.image === "month5"
        ? month5
        : month.image === "month6"
        ? month6
        : month.image === "month7"
        ? month7
        : month.image === "month8"
        ? month8
        : ""
    }
    alt={`Month ${month.details.title}`} 
  />

  <h1 className="absolute top-0 right-0 bg-[#FFCFFA] text-xl md:text-3xl font-light w-32 md:w-40 shadow-inner text-center rounded-3xl py-2 md:py-3 text-blue-500 before:absolute before:inset-0 before:rounded-3xl before:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]">
    {month.details.title}
  </h1>

  <p className="mb-6 bg-gradient-to-r from-[#FFCFFA] to-[#CBF3FF] rounded-2xl font-light px-4 md:px-5 py-6 md:py-8 text-center text-xl md:text-3xl w-[90%] md:w-[95%] -mt-12 md:-mt-16">
    {month.details.week}
  </p>
</div>
      <div className="bg-gradient-to-b from-[#FFCFFA] to-[#CBF3FF] p-10 rounded-2xl">
        <p className=" mb-16 mt-5 text-center font-medium text-xl">
          {month.details.description}
        </p>

        {month.details.sections?.length > 0 ? (
          month.details.sections.map((section, index) => (
            <section key={index} className="mb-8 border-b pb-6">
              <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
              <p className="text-lg mb-4">{section.content}</p>

              {Array.isArray(section.recommended) &&
                section.recommended.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold mb-2 mt-14">
                      Recommended:
                    </h3>
                    <ul className="list-disc pl-6 space-y-4">
                      {section.recommended.map((item, i) => (
                        <li
                          key={i}
                          className="text-lg font-medium tracking-wide"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {Array.isArray(section.avoid) && section.avoid.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-red-500 mb-2 mt-14">
                    Avoid:
                  </h3>
                  <ul className="list-disc pl-6 text-red-500 space-y-4">
                    {section.avoid.map((item, i) => (
                      <li
                        key={i}
                        className="text-lg  font-medium tracking-wide"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {Array.isArray(section.tips) && section.tips.length > 0 && (
                <>
                  <div className="mb-4 mt-14">
                    {section.tips.map((tip, i) => (
                      <div key={i} className="pl-10">
                        <h2 className="text-black block transition-all mb-4 font-medium text-2xl">
                          {tip.title}
                        </h2>
                        <h3 className="text-gray-900 block transition-all mb-4 text-lg pl-5">
                          {tip.duration}
                        </h3>
                        <p className="text-gray-900 block transition-all mb-4 text-lg pl-5">
                          {tip.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <h3 className="text-4xl font-semibold mb-10 mt-14 text-center underline">
                      Here are some yoga exercises:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-4">
                      {monthId === "first-month" &&
                        m1Es.map((item, i) => (
                          <img
                            key={i}
                            className="w-full object-cover rounded-lg shadow-lg"
                            src={item}
                            alt={`Yoga Exercise ${i + 1}`}
                          />
                        ))}
                    </div>
                  </div>
                </>
              )}

              {Array.isArray(section.tips) && section.tips.length > 0 && (
                <div className="mb-4 mt-14">
                  {section.tips.map((tip, i) => (
                    <div key={i} className="pl-10">
                      <h2 className="text-black block transition-all mb-4 font-medium text-2xl">
                        {tip.title}
                      </h2>
                      <h3 className="text-gray-900 block transition-all mb-4 text-lg pl-5">
                        {tip.duration}
                      </h3>
                      <p className="text-gray-900 block transition-all mb-4 text-lg pl-5">
                        {tip.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {Array.isArray(section.items) && section.items.length > 0 && (
                <div className="mb-4 mt-14">
                  {section.items.map((item, i) => (
                    <div key={i} className="pl-5">
                      <h2 className="text-black block transition-all mb-4 font-medium text-2xl">
                        {item.name}
                      </h2>

                      <p className="text-gray-900 block transition-all mb-4 text-lg pl-2">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {Array.isArray(section.videos) && section.videos.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold mb-2 mt-14 text-center underline">
                    Watch some yoga videos:
                  </h3>
                  {section.videos.map((video, i) => (
                    <a
                      key={i}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 underline block hover:text-blue-700 transition-all mb-4"
                    >
                      {video.title}
                    </a>
                  ))}
                </div>
              )}
            </section>
          ))
        ) : (
          <p className="text-gray-500">No additional details available.</p>
        )}
      </div>
    </div>
  );
};

export default MonthDetails;

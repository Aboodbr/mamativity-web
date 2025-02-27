import { useState } from "react"; // Add useState for search functionality
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import homeImage1 from "@/assets/homeImage1.png";
import homeRow11 from "@/assets/homeRow11.png";
import homeRow12 from "@/assets/homeRow12.png";
import homeRow13 from "@/assets/homeRow13.png";
import homeRow14 from "@/assets/homeRow14.png";

import homeRow21 from "@/assets/homeRow21.png";
import homeRow22 from "@/assets/homeRow22.png";
import homeRow23 from "@/assets/homeRow23.png";
import homeRow24 from "@/assets/homeRow24.png";
import SearchNav from "@/components/SearchNav";

const LatestArticles = [
  {
    title: "A Beginner's Guide to Exercising",
    views: "50.56k",
    date: "22.10.2024",
    image: homeRow11,
  },
  {
    title: "Swimming is a suitable sport",
    views: "50.56k",
    date: "22.10.2024",
    image: homeRow12,
  },
  {
    title: "Warning signs while exercising",
    views: "50.56k",
    date: "22.10.2024",
    image: homeRow13,
  },
  {
    title: "Things you should avoid",
    views: "50.56k",
    date: "22.10.2024",
    image: homeRow14,
  },
  {
    title: "Proper diet during pregnancy",
    views: "50.56k",
    date: "22.10.2024",
    image: homeRow14,
  },
  {
    title: "A Beginner's Guide to Exercising",
    views: "50.56k",
    date: "22.10.2024",
    image: homeRow11,
  },
  {
    title: "Swimming is a suitable sport",
    views: "50.56k",
    date: "22.10.2024",
    image: homeRow12,
  },
  {
    title: "Warning signs while exercising",
    views: "50.56k",
    date: "22.10.2024",
    image: homeRow13,
  },
  {
    title: "Things you should avoid",
    views: "50.56k",
    date: "22.10.2024",
    image: homeRow14,
  },
  {
    title: "Proper diet during pregnancy",
    views: "50.56k",
    date: "22.10.2024",
    image: homeRow14,
  },
];

const FeaturedArticles = [
  { title: "Healthy foods during pregnancy", image: homeRow21 },
  { title: "Weight gain during pregnancy", image: homeRow22 },
  { title: "Tips for Morning Sickness", image: homeRow23 },
  { title: "5 Tips for a Healthy Pregnancy", image: homeRow24 },
  { title: "Healthy foods during pregnancy", image: homeRow21 },
  { title: "Weight gain during pregnancy", image: homeRow22 },
  { title: "Tips for Morning Sickness", image: homeRow23 },
  { title: "5 Tips for a Healthy Pregnancy", image: homeRow24 },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Filter articles based on search query
  const filteredLatestArticles = LatestArticles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFeaturedArticles = FeaturedArticles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <SearchNav />

      <div className="relative flex flex-col items-center w-full overflow-hidden mt-7">
        <div className="flex flex-col max-w-2xl rounded-2xl p-6 bg-[#bceefd8f] md:flex-row items-center gap-6">
          <div className="w-48 h-48 relative flex-shrink-0 flex justify-center">
            <img
              src={homeImage1}
              alt="Mother and baby illustration"
              className="object-contain"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-[#7b0d73] mb-4">
              Everything you need in one place
            </h1>
            <div className="space-y-1 text-[#7b0d73]">
              <p>&quot;Pregnancy monitoring week by week&quot;</p>
              <p>&quot;Daily tips for child care&quot;</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            navigation
            pagination={{ clickable: true }}
            className="pb-6 "
          >
            {filteredLatestArticles.map((article, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center mx-1">
                  <div className="aspect-video relative ">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="bg-gradient-to-b from-[#FFCFFA] to-[#CBF3FF] rounded-2xl p-4 transition-shadow w-[95%] z-10 -mt-10">
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 ">
                      <span>{article.views}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Featured Articles</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            navigation
            pagination={{ clickable: true }}
            className="pb-6"
          >
            {filteredFeaturedArticles.map((article, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md ">
                  <div className=" relative">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="object-cover rounded-t-2xl"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </main>
    </div>
  );
}
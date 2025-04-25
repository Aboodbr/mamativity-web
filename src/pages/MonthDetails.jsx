import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  Dumbbell,
  Apple,
  Pill,
  Droplet,
  Lightbulb,
  Camera,
  Link2,
  Youtube,
  ExternalLink,
  Loader2,
  AlertCircle,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import SearchNav from "@/components/SearchNav";

const MonthDetails = () => {
  const { monthId } = useParams();
  const decodedMonthId = decodeURIComponent(monthId || "");

  const [sections, setSections] = useState([]);
  const [introductionText, setIntroductionText] = useState("");
  const [loading, setLoading] = useState(true);

  const monthMap = {
    "first-month": "first",
    "second-month": "second",
    "third-month": "third",
    "fourth-month": "fourth",
    "fifth-month": "fifth",
    "sixth-month": "sixth",
    "seventh-month": "seventh",
    "eighth-month": "eighth",
    "ninth-month": "ninth",
  };

  const monthDisplayName = decodedMonthId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        const firestoreMonthId = monthMap[decodedMonthId];
        if (!firestoreMonthId) {
          setLoading(false);
          return;
        }

        const [imagesSnapshot, linksSnapshot, textSnapshot] = await Promise.all(
          [
            getDocs(collection(db, "months", firestoreMonthId, "image")),
            getDocs(collection(db, "months", firestoreMonthId, "link")),
            getDocs(collection(db, "months", firestoreMonthId, "text")),
          ]
        );

        const newFirestoreTexts = {};
        textSnapshot.forEach((doc) => {
          newFirestoreTexts[doc.id] = doc.data().text;
        });

        const introText =
          newFirestoreTexts["introduction"] ||
          "During this month of pregnancy, it's important to take special care of health as it plays a major role in fetal development.";
        delete newFirestoreTexts["introduction"];

        const imagesBySection = {};
        imagesSnapshot.forEach((doc) => {
          const url = doc.data().image;
          const docId = doc.id.toLowerCase();
          if (url) {
            Object.keys(newFirestoreTexts).forEach((sectionKey) => {
              const cleanedSectionKey = sectionKey
                .replace(/^\d+(\.\d+)?\s*/, "")
                .replace(/\./g, "")
                .replace(/:$/, "")
                .toLowerCase()
                .trim();
              const cleanedDocId = docId
                .replace(/^\d+(\.\d+)?\s*/, "")
                .replace(/\./g, "")
                .replace(/:$/, "")
                .toLowerCase()
                .trim();
              if (cleanedDocId === cleanedSectionKey) {
                if (!imagesBySection[sectionKey]) {
                  imagesBySection[sectionKey] = [];
                }
                imagesBySection[sectionKey].push(url);
              }
            });
          }
        });

        const linksBySection = {};
        linksSnapshot.forEach((doc) => {
          const url = doc.data().url;
          const docId = doc.id.toLowerCase();
          if (url) {
            Object.keys(newFirestoreTexts).forEach((sectionKey) => {
              const cleanedSectionKey = sectionKey
                .replace(/^\d+(\.\d+)?\s*/, "")
                .replace(/\./g, "")
                .replace(/:$/, "")
                .toLowerCase()
                .trim();
              const cleanedDocId = docId
                .replace(/^\d+(\.\d+)?\s*/, "")
                .replace(/\./g, "")
                .replace(/:$/, "")
                .toLowerCase()
                .trim();
              if (cleanedDocId === cleanedSectionKey) {
                if (!linksBySection[sectionKey]) {
                  linksBySection[sectionKey] = [];
                }
                linksBySection[sectionKey].push(url);
              }
            });
          }
        });

        const newSections = [];
        Object.keys(newFirestoreTexts).forEach((sectionKey) => {
          const cleanedTitle = sectionKey
            .replace(/^\d+(\.\d+)?\s*/, "")
            .replace(/:$/, "")
            .replace(/\b\w/g, (char) => char.toUpperCase());
          const section = {
            title: cleanedTitle,
            text: newFirestoreTexts[sectionKey] || "Loading...",
            images: imagesBySection[sectionKey] || [],
            links: linksBySection[sectionKey] || [],
          };
          newSections.push(section);
        });

        setIntroductionText(introText);
        setSections(newSections);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
        setLoading(false);
      }
    };

    fetchFirestoreData();
  }, [decodedMonthId]);

  if (loading) {
    return (
      <div className="px-6 py-12 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
        <SearchNav />
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 p-10 rounded-3xl shadow-lg">
            <div className="flex flex-col items-center justify-center gap-4 h-64">
              <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
              <p className="text-lg text-gray-700">Loading data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (sections.length === 0 && !introductionText) {
    return (
      <div className="px-6 py-12 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 flex flex-col items-center justify-center">
        <SearchNav />
        <div className="max-w-4xl mx-auto bg-white/90 p-10 rounded-3xl shadow-lg text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Month Not Found
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            The page you are looking for is not available.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-full shadow-md transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const getSectionIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("exercise"))
      return <Dumbbell className="w-8 h-8 text-pink-600" />;
    if (lowerTitle.includes("diet"))
      return <Apple className="w-8 h-8 text-pink-600" />;
    if (lowerTitle.includes("essential") || lowerTitle.includes("vitamins"))
      return <Pill className="w-8 h-8 text-pink-600" />;
    if (lowerTitle.includes("water") || lowerTitle.includes("hydration"))
      return <Droplet className="w-8 h-8 text-pink-600" />;
    if (lowerTitle.includes("tips"))
      return <Lightbulb className="w-8 h-8 text-pink-600" />;
    return null;
  };

  const renderTextWithBreaks = (text) => {
    const parts = text.split("-");
    return parts.map((part, index) => (
      <span key={index}>
        • {part.trim()}
        {index < parts.length - 1 && <br />}
      </span>
    ));
  };

  const getGridCols = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("diet")) {
      return "grid-cols-1 md:grid-cols-3";
    }
    return "grid-cols-1 md:grid-cols-2";
  };

  return (
    <div className="px-4 py-12 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <SearchNav />
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-pink-700 bg-white/80 backdrop-blur-sm inline-block px-8 py-4 rounded-full shadow-lg border-2 border-pink-200 hover:shadow-xl transition-shadow duration-300">
            {monthDisplayName}
          </h1>
        </header>

        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg">
          {introductionText && (
            <div className="relative bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-2xl mb-16 shadow-inner border border-pink-200">
              <div className="absolute -top-3 -left-3 bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                Introduction
              </div>
              <p className="text-xl text-gray-800 leading-relaxed text-justify">
                {introductionText}
              </p>
            </div>
          )}

          {sections.map((section, index) => (
            <section
              key={index}
              className="relative bg-white p-8 rounded-2xl mb-16 shadow-md border-t-4 border-pink-400 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center mb-6 gap-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  {getSectionIcon(section.title) || (
                    <Lightbulb className="w-8 h-8 text-pink-600" />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {section.title}
                </h2>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {renderTextWithBreaks(section.text)}
                </p>
              </div>

              {section.images.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-pink-500" />
                    Illustrations
                  </h3>
                  <div className={`grid ${getGridCols(section.title)} gap-6`}>
                    {section.images.map((item, i) => (
                      <div
                        key={i}
                        className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                      >
                        <img
                          className="w-full h-[512px] object-contain transition-transform duration-500 group-hover:scale-105"
                          src={item}
                          alt={`${section.title} image ${i + 1}`}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-white font-medium">
                            {section.title} - Image {i + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {section.links.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-6 text-gray-700 flex items-center gap-2 mt-10">
                    <Link2 className="w-5 h-5 text-pink-500" />
                    Useful Links
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.links.map((video, i) => (
                      <a
                        key={i}
                        href={video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-200"
                      >
                        <Youtube className="w-5 h-5 text-red-500" />
                        <span>{`Video ${i + 1} about ${section.title}`}</span>
                        <ExternalLink className="w-4 h-4 ml-auto opacity-70" />
                      </a>
                    ))}
                  </div>
                </>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthDetails;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import SearchNav from "@/components/SearchNav";
import { Link } from "react-router-dom";
import { db } from "@/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

export default function Article() {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories] = useState([
    "All",
    "Mothers health",
    "Home",
    "Children and newborns",
    "Breastfeeding",
  ]);

  useEffect(() => {
    const articlesRef = collection(db, "article");

    const unsubscribe = onSnapshot(
      articlesRef,
      (snapshot) => {
        const unsubscribeList = [];

        snapshot.forEach((docSnap) => {
          const title = docSnap.id; // e.g. "Breastfeeding"
          const subcollections = [
            "breastfeeding-natural-",
            "formula-feeding-artifi-",
            "baby-care-tips",
            "frequently-asked-questions",
            "physical-activity",
            "rest-and-sleep",
            "baby-health-and-common-illnesses",
            "child-growth-stages",
            "complementary-feeding-introducing-solid-foods-",
            "daily-baby-care",
            "sensory-and-motor-skills-development",
            "general-women-s-health",
            "women-s-health-after-childbirth",
            "women-s-health-before-pregnancy",
            "women-s-health-during-pregnancy",
          ];

          subcollections.forEach((subcollection) => {
            const subcollectionRef = collection(
              db,
              "article",
              title,
              subcollection
            );

            const subUnsubscribe = onSnapshot(
              subcollectionRef,
              (subSnapshot) => {
                const newArticles = subSnapshot.docs.map((articleDoc) => ({
                  id: articleDoc.id,
                  path: articleDoc.ref.path,
                  category: title, // Use title as category
                  title: title, // Use title as article title
                  subtitle: subcollection, // Use subcollection as subtitle
                  content: articleDoc.data().content || "",
                  images: articleDoc.data().images || [],
                  publicationDate: "No date available",
                  createdAt: articleDoc.data().createdAt || "No date available",
                  articleId: articleDoc.data().articleId || "",
                }));

                setArticles((prevArticles) => {
                  const otherArticles = prevArticles.filter(
                    (article) =>
                      !article.path.startsWith(
                        `article/${title}/${subcollection}`
                      )
                  );
                  return [...otherArticles, ...newArticles];
                });
              },
              (error) => {
                console.warn(
                  `Error fetching from article/${title}/${subcollection}:`,
                  error
                );
              }
            );
            unsubscribeList.push(subUnsubscribe);
          });
        });

        setLoading(false);
        return () => unsubscribeList.forEach((unsub) => unsub());
      },
      (error) => {
        console.warn("Error fetching articles:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearchTerm =
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    return matchesSearchTerm && matchesCategory;
  });

  const handleDelete = async (articlePath) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        // `articlePath` is like "article/SomeCategory/some-subcollection/docId"
        // We need to split that into segments for doc()
        const pathSegments = articlePath.split("/");
        const articleRef = doc(db, ...pathSegments);
        await deleteDoc(articleRef);

        await Swal.fire({
          title: "Deleted!",
          text: "The article has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting article:", error);
        await Swal.fire({
          title: "Error",
          text: "Failed to delete the article. Please try again.",
          icon: "error",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-500">Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <SearchNav onSearch={setSearchTerm} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-800">Articles</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <label htmlFor="category-filter" className="mr-2 text-gray-700">
              Filter by Category:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <Link
            to={"add-new-article"}
            className="bg-blue-100 flex items-center py-1 hover:bg-blue-200 text-black bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none rounded-full px-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Article
          </Link>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No articles available.{" "}
          <Link to="add-new-article" className="text-blue-500 underline">
            Add a new article
          </Link>{" "}
          to get started.
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500">
                  <th className="text-left py-4 px-6 font-medium">Title</th>
                  <th className="text-left py-4 px-6 font-medium">Subtitle</th>
                  <th className="text-left py-4 px-6 font-medium">Category</th>
                  <th className="text-left py-4 px-6 font-medium">Image</th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center justify-start">
                      Created At
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <tr
                      key={article.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 text-left">{article.title}</td>
                      <td className="py-4 px-6 text-left">
                        {article.subtitle}
                      </td>
                      <td className="py-4 px-6 text-left">
                        {article.category}
                      </td>
                      <td className="py-4 px-6 text-left">
                        {article.images && article.images.length > 0 ? (
                          <img
                            src={article.images[0]}
                            alt="Article image"
                            className="h-12 w-12 object-cover rounded"
                          />
                        ) : (
                          "No image"
                        )}
                      </td>
                      <td className="py-4 px-6 text-left">
                        {article.createdAt}
                      </td>
                      <td className="py-4 px-6 text-left">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(article.path)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      No articles match your search or category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

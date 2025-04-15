import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import SearchNav from "@/components/SearchNav";
import { Link } from "react-router-dom";
import { db } from "@/firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";

export default function Article() {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب البيانات من جميع المجموعات في Firestore
  useEffect(() => {
    const categories = [
      "Pregnancy problems",
      "Maternity bag",
      "Mothers health",
      "Children and newborns",
      "Children's vaccinations",
      "Breastfeeding",
    ];

    const unsubscribes = [];

    categories.forEach((category) => {
      const unsubscribe = onSnapshot(collection(db, category), (snapshot) => {
        const categoryArticles = snapshot.docs.map((articleDoc) => ({
          id: articleDoc.id,
          category: category,
          ...articleDoc.data(),
        }));

        setArticles((prevArticles) => {
          const otherArticles = prevArticles.filter(
            (article) => article.category !== category
          );
          return [...otherArticles, ...categoryArticles];
        });
      });
      unsubscribes.push(unsubscribe);
    });

    setLoading(false);

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, []);

  // تصفية المقالات بناءً على البحث
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.excerpt?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      article.content?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      article.imageCaption?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      "";
    return matchesSearch;
  });

  // دالة الحذف
  const handleDelete = async (articleId, category) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        const articleRef = doc(db, category, articleId);
        await deleteDoc(articleRef);
        console.log(
          `Article ${articleId} from category ${category} deleted successfully`
        );
      } catch (error) {
        console.error("Error deleting article:", error);
        alert("Failed to delete article. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading articles...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <SearchNav onSearch={setSearchTerm} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-800">Articles</h1>
        <Link
          to={"add-new-article"}
          className="bg-blue-100 flex items-center py-1 hover:bg-blue-200 text-black bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none rounded-full px-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add <span className="hidden md:flex mx-1">new</span> articles
        </Link>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="text-left py-4 px-6 font-medium">
                  Sub headline
                </th>
                <th className="text-left py-4 px-6 font-medium">Image</th>
                <th className="text-left py-4 px-6 font-medium">
                  Image Caption
                </th>
                <th className="text-left py-4 px-6 font-medium">
                  <div className="flex items-center">
                    Publication Date
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-medium">
                  <div className="flex items-center">
                    Date Created
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-medium">Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr
                  key={`${article.category}-${article.id}`}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    {article.excerpt || "No sub headline"}
                  </td>
                  <td className="py-4 px-6">
                    {article.imageUrl ? (
                      <img
                        src={article.imageUrl}
                        alt={article.imageCaption || "Article image"}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {article.imageCaption || "No caption"}
                  </td>
                  <td className="py-4 px-6">
                    {article.publicationDate || "No date"}
                  </td>
                  <td className="py-4 px-6">
                    {article.createdAt || "No date"}
                  </td>
                  <td className="py-4 px-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(article.id, article.category)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
